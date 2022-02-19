/**
 * Queries for retrieving data
 * from the database using supabase.
 */
export const QUERIES = [
	{
		table: 'accounts',
		select: 'balance',
	},
	{
		table: 'flows',
		select: 'name, frequency, occurrences, amount'
	},
	{
		table: 'goals',
		select: 'name, amountTotal, amountPaid, deadline, priority'
	},
	{
		table: 'transactions',
		select: 'amount, timestamp, fid (name), gid (name)'
	},
];
