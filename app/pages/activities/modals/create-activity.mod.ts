import {FormBuilder, Validators} from 'angular2/common';
import {Page, Modal, ViewController, NavController, NavParams} from 'ionic-angular';
import {Icon} from '../../../shared/interfaces/icon';
import {ICONS} from '../../../services/icon-provider/mock-icons';
import {IconProvider} from '../../../services/icon-provider/icon-provider.svc';

@Page({
  templateUrl: 'build/pages/activities/modals/create-activity.mod.html',
  providers: [IconProvider]
})
export class CreateActivityModal {
  viewCtrl: ViewController;
  activityForm: any;
  activityData: any;
  private icons: Array<Icon>;

  constructor(viewCtrl: ViewController, form: FormBuilder, private _iconProvider: IconProvider) {
    this.viewCtrl = viewCtrl;
    this.activityForm = form.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  getIcons() {
    this._iconProvider.getIcons().then(icons => {
      this.icons = icons;
    });
  }

  ngOnInit() {
    this.getIcons();
  }

  create(event) {
    this.activityData = {
      name: this.activityForm.value.name,
      description: this.activityForm.value.description,
      icon: this.activityForm.value.icon,
      children: [],
      delta_time: '00:00:00',
      active: false
    };
    event.preventDefault();
    this.close(true);
  }

  close(push: boolean = false) {
    this.viewCtrl.dismiss((push ? this.activityData : null));
  }
}
