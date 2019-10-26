import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.page.html',
    styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {
    skills: any;
    activeSkills: any;
    popup: any = false;
    types: any = [];
    dropdown: any = false;
    typeSelect: any = null;
    typeSelectDef: any = null;
    accomplished: any = [];
    idSkill: any = 0;
    expNew: any = false;

    modalItemView: any = false;
    itemSkill: any = {};

    modalExpView: any = false;
    experiences: any = {};
    selectView: any = false;
    title: any;
    type_id: any;

    expItem: any = null;

    constructor(public router: Router, public storage: Storage, public http: HttpClient) {
        this.itemSkill = {experiences: []};

        this.experiences = {title: 'Professional', id: 0, type_id: 1, skill: '', company: '', accomplished: []};

        this.typeSelect = this.experiences;

        this.types = [
            {title: 'Professional', id: 1},
            {title: 'Volunteer', id: 2},
        ];

        this.skills = [{
            title: 'Product', id: 1, text: 'Product',
            skills: [{
                title: 'Analytical', id: 1, check: false, balance: 0.05,
                experiences: [
                    {
                        title: 'Professional', id: 1, type_id: 1, skill: 'Artistic music', company: 'COO',
                        accomplished: [
                            {
                                title: 'Coordinated vendor calls'
                            },
                            {
                                title: 'New methods for defusing conflict'
                            }
                        ]
                    },
                    {
                        title: 'Volunteer', id: 2, type_id: 2, skill: '1 Million Cups', company: 'Organizer',
                        accomplished: [
                            {
                                title: 'Managed irtern feedback'
                            },
                        ]
                    }
                ]
            }]
        }];
    }

    ngOnInit() {
        let that = this;
        this.storage.get('jobId').then((jobId) => {
            this.storage.get('skillId').then((skillId) => {
                const headers = new Headers();
                headers.append('Accept', 'application/json');
                headers.append('Content-Type', 'application/json');
                this.http.get('http://127.0.0.1:3000/positions', {})
                    .subscribe(data => {
                        this.skills = data;
                        this.activeSkills = that.skills.find((position) => position.id === jobId);
                        this.activeSkills = this.activeSkills.skills.filter((skill) => skillId.indexOf(skill.id) > -1);


                    }, errorResp => {
                        console.log(errorResp);
                    });
            });
        });
    }

    openItem(item) {
        const that = this;
        that.itemSkill = {experiences: []};
        that.modalItemView = true;
        that.activeSkills = this.activeSkills.filter(function(item2) {
            if (item.id == item2.id) {
                that.itemSkill = item2;
                item2.check = item2.check ? false : true;
            } else {
                item2.check = false;
            }
            return item2;
        });
    }

    closeItem() {
        this.itemSkill = {experiences: []};
        this.modalItemView = false;
    }

    addExp(exp = null) {
        const that = this;
        this.types.forEach(function(item, i) {
            if (i == 0) {
                that.title = item.title;
                that.type_id = item.id;
            }
        });
        this.modalExpView = true;
        if (exp != null) {
            this.expItem = exp;
            this.experiences = exp;
        } else {
            this.expItem = null;
            this.experiences = {title: this.title, id: 0, type_id: this.type_id, skill: '', company: '', accomplished: []};
        }
    }

    closeExp() {
        this.experiences = {title: 'Professional', id: 0, type_id: 1, skill: '', company: '', accomplished: []};
        this.modalExpView = false;
    }

    addAcc() {
        const acc = {title: ''};
        this.experiences.accomplished.push(acc);
    }

    addType(type) {
        this.experiences.title = type.title;
        this.experiences.type_id = type.type_id;
        this.selectView = false;
    }

    saveExp() {
        if (!this.itemSkill.experiences) {
            this.itemSkill.experiences = [];
        }
        this.experiences.accomplished = this.experiences.accomplished.filter(function(acc) {
            if (acc.title.length > 0) {
                return acc;
            }
        });
        if (this.experiences.skill != '' && this.experiences.company != '') {
            if (this.expItem != null) {

            } else {
                this.itemSkill.experiences.push(this.experiences);
            }
        }
        // this.experiences = {title: 'Professional', id: 0, type_id: 1, skill: '', company: '', accomplished: []};
        this.modalExpView = false;
    }

    /*
    editTempData(item, id) {
      this.expNew = false;
      this.idSkill = id;
      this.typeSelect = item;
      this.accomplished = item.accomplished;
      this.popup = true;
    }

    addAccomplished() {
      let array = this.typeSelect.accomplished;
      if (array.length < 11) {
        this.typeSelect.accomplished.push({title: ''});
      }
    }

    done() {
      if (this.typeSelect.type_id != 0 && this.typeSelect.company.length > 2 && this.typeSelect.skill.length > 2) {
        let that = this;
        this.activeSkills = this.activeSkills.filter(function(item){
          if (that.idSkill == item.id) {
            if (that.expNew) {
              that.typeSelect.id = item.experiences.length + 1;
              that.accomplished = that.accomplished.filter(function(acc){
                if (acc.title != '') return acc;
              })
              that.typeSelect.accomplished = that.accomplished;
              item.experiences.push(that.typeSelect);
            } else {
              item.experiences = item.experiences.filter(function(exp){
                that.accomplished = that.accomplished.filter(function(acc){
                  if (acc.title != '') return acc;
                })
                if (exp.id == that.typeSelect.id) {
                   that.typeSelect.accomplished = that.accomplished;
                   exp = that.typeSelect;
                }
                return exp;
              });
            }
          }
          return item;
        })
        this.popup = false;
        this.typeSelect = new Object();
        this.typeSelect.assign(this.typeSelectDef);
      }
    }
    */
    save() {
        this.router.navigate(['/main']);
    }
}
