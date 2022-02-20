/**
 * Queries for retrieving data
 * from the database using supabase.
 */
export const QUERIES = [
	{
		table: 'accounts',
		select: '*',
	},
	{
		table: 'flows',
		select: '*'
	},
	{
		table: 'goals',
		select: '*'
	},
	{
		table: 'transactions',
		select: '*'
	},
];
