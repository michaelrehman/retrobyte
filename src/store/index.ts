import { reactive } from 'vue';
import { supabase } from '@/supabase';
import { QUERIES } from '@/supabase/queries';

import type { definitions } from '@/supabase/types';
import { accountsManager } from './managers';
type Store = {
	accounts: definitions['accounts'][],
	flows: definitions['flows'][],
	goals: definitions['goals'][],
	transactions: definitions['transactions'][]
};

let isStoreInitalized = false;
// @ts-ignore properties dynamically loaded
export const store = reactive<Store>({});

/**
 * Intializes the global store with the necessary data from the database.
 * @param onInit callback function once the store has been initialized
 */
 export async function initStore(onInit?: Function) {
	if (!supabase.auth.user()) {
		throw new Error('Unathenticated request to DB.');
	} else if (isStoreInitalized) {
		onInit && onInit();
	 	return;
	} // if

	// Wait for all queries to be fetched before continuing
	await Promise.all(QUERIES.map(async (query) => {
		const { table, select } = query;

		const { data, error } = await supabase.from(table).select(select)
			.eq('uid', supabase.auth.user()?.id);

		error ? console.error(error) : Object.assign(store, { [table]: data });
	}));

	if (store.accounts.length === 0) {
		const { data } = await accountsManager.add({
			balance: 0,
			// @ts-ignore
			uid: supabase.auth.user()?.id
		});
		store.accounts.push(data);
	}

	isStoreInitalized = true;
	onInit && onInit();
 } // initStore
