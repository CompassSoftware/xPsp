
import {FormBuilder, Validators} from 'angular2/common';
import {IONIC_DIRECTIVES, Page, Modal, ViewController, NavController, NavParams} from 'ionic-angular';
import {Icon} from '../../../shared/interfaces/icon';
import {ICONS} from '../../../services/icon-provider/mock-icons';
import {IconProvider} from '../../../services/icon-provider/icon-provider.svc';
import {Activity} from '../../../shared/interfaces/activity';
import {ActivityList} from '../../../components/activity-list/activity-list.cmp';

@Page({
  templateUrl :'build/pages/activities/modals/edit-activity.mod.html',
  directives: [IONIC_DIRECTIVES],
  providers: [IconProvider]
})
export class EditActivityModal {
  viewCtrl: ViewController;
  editForm: any;
  activityData: any;
  activity: Activity;
  private icons: Array<Icon>;

  constructor(params: NavParams, viewCtrl: ViewController, form: FormBuilder, private _iconProvider: IconProvider) {
    this.activity = params.get('activity');
    this.viewCtrl = viewCtrl;
    this.editForm = form.group({
      name: [this.activity.name],
      icon: [this.activity.icon]
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

  edit(event) {
    this.activityData = {
      name: this.editForm.value.name,
      icon: this.editForm.value.icon,
    };
    // event.preventDefault();
    this.close(true);
  }

  close(push: boolean = false) {
    this.viewCtrl.dismiss((push ? this.activityData :null));
  }
}
