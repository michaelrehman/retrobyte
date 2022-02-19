import { reactive } from 'vue';
import { supabase } from '@/supabase';
import { QUERIES } from '@/supabase/queries';

let isStoreInitalized = false;
export const store = reactive({});

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

	isStoreInitalized = true;
	onInit && onInit();
 } // initStore
