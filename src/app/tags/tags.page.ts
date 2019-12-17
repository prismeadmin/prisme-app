import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import 'hammerjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.page.html',
    styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {
    id: any;
    skill_id: any;
    skills: any = [];
    itemSkill: any;
    modalItemView: any = false;
    modalExpView: any = false;
    selectView: any = false;
    selectViewBlock: any = false;
    experiences: any;
    types: any;
    cardIndex: any;
    
    constructor(private route: ActivatedRoute, public router: Router, public storage: Storage, public http: HttpClient) {
        this.itemSkill = {id: 0, name: '', check: false, balance: 0.00, experiences: []};
        this.types = [{name: 'Professional', id: 1},{name: 'Volunteer', id: 2}];
        this.experiences = {id: 0, name: '', skill: '', company: '', accomplished: []};
        this.cardIndex = 1;
    }

    ngOnInit() {
      this.id = null;
        let that = this;
        this.route.queryParams.subscribe(params => {
          if (params && params.id) {
            this.id = JSON.parse(params.id);
          }
        });           
        this.storage.get('token').then((token) => {
            this.http.get(environment.url + '/users/skill?filter[where][user_id]=' + token, {})
            .subscribe((data:any) => {
                let that = this;  
                data.forEach(function(item){
                  that.skill_id = item.id;
                  item.skills.forEach(function(item2){
                    that.skills.push(item2);
                  }) 
                })                      
                if (this.id) {
                  that.skills.forEach(function(item){
                    if (item.id == that.id) {
                      that.itemSkill = item;
                      that.modalItemView = true;          
                    }          
                  });    
                }            
                let size = document.getElementById('cardsBlock').getBoundingClientRect();
                let sizeTab = document.getElementById('cardsBlock').querySelectorAll('.item-list-clone')[0].getBoundingClientRect();
                let wide = (size.width - sizeTab.width) / this.skills.length;
                let colors = ['#FB4702', '#ED1B0F', '#FE7804','#FE9601','#F52D41','#FBC70F','#FAE910','#FDD808','#AAC80D', '#9CD337','#73C030','#401D8C','#228FAB','#0B59B1','#A9416B'];
                this.skills.map(function(item, i){
                  item.color = colors[Math.floor(Math.random() * Math.floor(colors.length - 1))];
                  item.wide = wide * i;
                  return item;
                });
                this.cardIndex = this.skills.length - 1;
            }, errorResp => {
              console.log(errorResp);
            });
        });  
        
    }
    
    swipeEvent(e) {
      if (e.target.closest('.item-list-tab')) {
        if (e.deltaX > 100) {
          if (this.cardIndex > 0) {
            this.cardIndex = this.cardIndex - 1;
          }
        }
        if (e.deltaX < - 100) {
          if (this.cardIndex < this.skills.length - 1) {
            this.cardIndex = this.cardIndex + 1;
          }
        }        
      }      
    }
    
    ionViewWillEnter() {
      this.id = null;
      let that = this;
      this.route.queryParams.subscribe(params => {
        if (params && params.id) {
          this.id = JSON.parse(params.id);
        }
      });         
      if (this.id) {
        this.skills.forEach(function(item){
          if (item.id == that.id) {
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
