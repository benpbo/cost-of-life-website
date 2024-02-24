export class Period {
	kind: 'Month' | 'Year';
	every: number;

	constructor(kind: 'Month' | 'Year', every: number) {
		this.kind = kind;
		this.every = every;
	}
}

export class RecurringMoneyValue {
	amount: number;
	period: Period;

	constructor(amount: number, period: Period) {
		this.amount = amount;
		this.period = period;
	}
}

export class ExpenseSource {
	id: number;
	name: string;
	expense: RecurringMoneyValue;

	constructor(id: number, name: string, expense: RecurringMoneyValue) {
		this.id = id;
		this.name = name;
		this.expense = expense;
	}
}
