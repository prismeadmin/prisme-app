import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.page.html',
    styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {
    skill_id: any;
    skills: any = [];
    itemSkill: any;
    modalItemView: any = false;
    modalExpView: any = false;
    selectView: any = false;
    selectViewBlock: any = false;
    experiences: any;
    types: any;
    
    constructor(public router: Router, public storage: Storage, public http: HttpClient) {
        this.itemSkill = {id: 0, name: '', check: false, balance: 0.00, experiences: []};
        this.types = [{name: 'Professional', id: 1},{name: 'Volunteer', id: 2}];
        this.experiences = {id: 0, name: '', skill: '', company: '', accomplished: []};
    }

    ngOnInit() {
        let that = this;
        this.storage.get('token').then((token) => {
            this.http.get(environment.url + '/users/skill?filter[where][user_id]=' + token, {})
            .subscribe(data => {
                let that = this;  
                data.forEach(function(item){
                  that.skill_id = item.id;
                  item.skills.forEach(function(item2){
                    that.skills.push(item2);
                  }) 
                })         
                if (that.router.browserUrlTree.queryParams.id) {
                  that.skills.forEach(function(item){
                    if (item.id == that.router.browserUrlTree.queryParams.id) {
                      that.itemSkill = item;
                      that.modalItemView = true;          
                    }          
                  });    
                }                     
            }, errorResp => {
              console.log(errorResp);
            });
        });  
        
    }
    
    ionViewWillEnter() {
      let that = this;
      if (this.router.browserUrlTree.queryParams.id) {
        this.skills.forEach(function(item){
          if (item.id == that.router.browserUrlTree.queryParams.id) {
            that.itemSkill = item;
            that.modalItemView = true;          
          }          
        });    
      }  
    }

    openItem(item) {
        this.itemSkill = item;
        this.modalItemView = true;
    }
    
    cancelItem() {
      this.itemSkill = {name: '', experiences: []};
      this.modalItemView = false;      
    }
    
    removeExp(exp) {
      this.itemSkill.experiences = this.itemSkill.experiences.filter(function(item){
        if (exp.id != item.id) {
          return item;
        }
      })
    }
    
    closeItem() {
      let that = this;
      if (this.skill_id) {
        this.skills.forEach(function(item, i){
          if (item.id == that.itemSkill.id) {
            that.skills[i] = that.itemSkill;
          }
        })
        const postData = {
          'skills': this.skills,
        };
        this.http.patch(environment.url + '/users/skill/' + this.skill_id, postData, {})
        .subscribe((data: any) => {}, error => {
          console.log(error);
        });          
      }      
      this.itemSkill = {name: '', experiences: []};
      this.modalItemView = false;        
    }
    
    selectViewClick(view) {
      if (!this.selectViewBlock) {
        this.selectView = view;
      }
    }
    
    addExp(exp = null) {
        this.modalExpView = true;
        if (exp == null) {
          this.selectViewBlock = false;
          this.experiences = {id: 0, name: '', skill: '', company: '', accomplished: []};
        } else {
          this.selectViewBlock = true;
          this.experiences = exp;
        }
    }

    addType(type) {
      this.experiences.name = type.name;
      this.selectView = false;
    }

    addAcc() {
      if (this.experiences.accomplished.length < 5) {
        this.experiences.accomplished.push({name: ''});
      }
    }
    
    closeExp() {
      this.experiences = {id: 0, name: '', skill: '', company: '', accomplished: []};
      this.modalExpView = false;
    }    

    saveExp() {
      let that = this;
      if (!this.itemSkill.experiences) {
        this.itemSkill.experiences = [];
      }
      if (this.experiences.name != '')
      this.experiences.accomplished = this.experiences.accomplished.filter(function(acc) {
        if (acc.name.length > 0) {
              return acc;
          }
      });
      if (this.experiences.name != '' && this.experiences.skill != '' && this.experiences.company != '') {
        if (this.experiences.id == 0) {
          let ids = [];
          let id = 0;
          this.itemSkill.experiences.forEach(function(item){
            ids.push(item.id);
          });
          if (ids.length > 0) {
            ids.sort();
            id = ids[0];
          }
          this.experiences.id = Number(id) + 1;
          this.itemSkill.experiences.push(this.experiences);
        } else {
          this.itemSkill.experiences.forEach(function(item, i){
            if (item.id == that.experiences.id) {
              that.itemSkill.experiences[i] = that.experiences;
            }
          });
        }
      }
      this.experiences = {id: 0, name: '', skill: '', company: '', accomplished: []};
      this.modalExpView = false;
    }

    home () {
      this.modalItemView = false; 
      this.router.navigate(['/main']);
    }

    explore () {
      this.modalItemView = false; 
      this.router.navigate(['/explore']);
    }

    collect () {
      this.modalItemView = false; 
      this.router.navigate(['/collect']);
    }

    user () {
      this.modalItemView = false; 
      this.router.navigate(['/user']);
    }

    more () {
      this.modalItemView = false; 
      this.router.navigate(['/more']);
    }    
}
