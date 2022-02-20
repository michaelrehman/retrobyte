import type { PostgrestError } from '@supabase/supabase-js';
import type { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder';

import { supabase } from '@/supabase';
import type { definitions } from '@/supabase/types';

import { store } from '@/store';

/**
 * Class to streamline synchonization between DB and local store.
 *
 * @template T Type to synchronize changes with.
 */
class Manager<T> {
	/** The corresponding DB table/store key. */
	table: string;
	/** The primary key. */
	pk: string;
	/** Match criteria for update and delete operations. */
	produceMatchCriteria: (data: T) => {};

	constructor(
		table: string,
		pk: string,
		produceMatchCriteria: (data: T) => {},
	) {
		this.table = table;
		this.pk = pk;
		this.produceMatchCriteria = produceMatchCriteria;
	} // constructor

	/** The base query to send to superbase. */
	get baseQuery(): SupabaseQueryBuilder<T> {
		// Have to return a new one each time since it'll
		// otherwise just keep appending to the same URL
		return supabase.from<T>(this.table);
	} // baseQuery

	/**
	 * Adds the given data to the DB and local store.
	 * @param data
	 */
	async add(inputs: T): Promise<PostgrestError | null> {
		const { data, error } = await this.baseQuery.insert([inputs]);

		if (!error && data) {
			// @ts-ignore
			// Versions created on the frontend aren't given an index,
			// so give it the index insertion into the store.
			store[this.table].push({ [this.pk]: data[0][this.pk], ...inputs });
		} // if

		return { data, error };
	} // add

	/**
	 * Updates the DB with the provided data.
	 * @param data
	 */
	async save(data: T): Promise<PostgrestError | null> {
		const { error } = await this.baseQuery.update(data)
			.match(this.produceMatchCriteria(data));

		if (!error) {
			// Update store copy
			// @ts-ignore
			const index = store[this.table].findIndex((item) => item[this.pk] === data[this.pk]);
			// @ts-ignore
			store[this.table][index] = { ...data };
		} // if

		return error;
	} // save

	/**
	 * Deletes the given data from the DB and local store.
	 * @param dataForStore
	 */
	async delete(data: T): Promise<PostgrestError | null> {
		const { error } = await this.baseQuery
			.delete().match(this.produceMatchCriteria(data));

		if (!error) {
			// @ts-ignore
			const deletionIndex = store[this.table].indexOf(data);
			// @ts-ignore
			store[this.table].splice(deletionIndex, 1);
		} // if

		return error;
	} // delete
} // Manager<T>

export const goalsManager = new Manager<definitions['goals']>(
	'goals', 'gid',
	function criteria(goal) {
		return { gid: goal.gid };
	}
);

export const transactionsManager = new Manager<definitions['transactions']>(
	'transactions', 'tid',
	function criteria(transaction) {
		return { tid: transaction.tid };
	}
);

export const accountsManager = new Manager<definitions['accounts']>(
	'accounts', 'aid',
	function criteria(account) {
		return { aid: account.aid };
	}
);
