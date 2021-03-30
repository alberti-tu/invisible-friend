export class Gift {
    public from: string;
    public to: string;
	public show: boolean;

    public constructor(from: string) {
        this.from = from;
        this.to = '';
		this.show = false;
    }
}