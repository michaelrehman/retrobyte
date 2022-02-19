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
		select: 'name, frequency, amount'
	},
	{
		table: 'goals',
		select: 'name, amountTotal, amountPaid, deadline, priority'
	},
	{
		table: 'transactions',
		select: 'amount, dateTime, fid (name), gid (name)'
	},
];
