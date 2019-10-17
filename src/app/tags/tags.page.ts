import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

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
  itemSkill: any = [];

  modalExpView: any = false;
  experiences: any = {};
  selectView: any = false;
  title: any;
  type_id: any;

  constructor(public router: Router, public storage: Storage) {
    this.itemSkill = [{experiences: []}]

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
        this.activeSkills = this.skills.filter(function(job){
          if (jobId == job.id) {
            job.skills = job.skills.filter(function(skill){
              if (skillId.indexOf(skill.id) >= 0) {
                return skill;
              }
            })
            return job;
          }
        });
        this.activeSkills = this.activeSkills[0].skills;
      });
    });
  }

  openItem(id) {
    const that = this;
    that.modalItemView = true;
    that.activeSkills = this.activeSkills.filter(function(item){
      if (id == item.id) {
        that.itemSkill.push(item);
        item.check = item.check ? false : true;
      } else {
        item.check = false;
      }
      return item;
    })
  }

  closeItem() {
    this.itemSkill = [{experiences: []}];
    this.modalItemView = false;
  }

  addExp(exp = null) {
    const that = this;
    this.types.forEach(function(item, i){
      if (i == 0) {
        that.title = item.title;
        that.type_id = item.id;
      }
    });
    this.modalExpView = true;
    if (exp != null) {
      this.experiences = exp;
    } else {
      this.experiences = {title: '', id: this.title, type_id: this.type_id, skill: '', company: '', accomplished: []};
    }
  }

  closeExp(){
    this.experiences = {};
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

  saveExp(){
    this.skills = this.skills.filter(function(item, i){

    })
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
