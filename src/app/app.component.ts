import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gift } from './models/gift';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	public userList: Gift[] = [];
	public form: FormGroup;

	constructor(private _formBuilder: FormBuilder) {
		this.form = this._formBuilder.group({
			user: ['', Validators.required]
		});
	}

	public saveUser(): void {
		const user = this.form.value.user;

		if (this.userList.filter(item => item.from == user).length == 0) {
			this.userList.push(new Gift(user));
		}

		this.form.reset();
	}

	public startPairing() {
		if (this.userList.length < 2) {
			return;
		}

		let error: boolean;
		do {
			// Set up
			const temp: Gift[] = [];
			this.userList.forEach(item => {
				temp.push(new Gift(item.from));
				item.show = false;
				item.to = '';
			});

			// Generate gifts
			for (const gift of this.userList) {
				while (gift.to == '') {
					const rdm = Math.floor(Math.random() * temp.length);
					if (gift.to != temp[rdm].from) {
						gift.to = temp[rdm].from;
						temp.splice(rdm, 1);
					}
				}
			}

			// Check if everything is correct
			error = false;
			for (const gift of this.userList) {
				if (gift.from == gift.to) {
					error = true;
				}
			}
		} while (error);
	}

	public showGift(gift: Gift) {
		gift.show = true;
	}

	public deleteUser(gift: Gift) {
		this.userList = this.userList.filter(item => item.from != gift.from);
	}
}
