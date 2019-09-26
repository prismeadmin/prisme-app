import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.page.html',
    styleUrls: ['./skills.page.scss'],
})
export class SkillsPage implements OnInit {
    jobId: any;
    skills: any;

    constructor(public router: Router, public storage: Storage) {
        this.jobId = 1;
        this.skills = [
            {
                title: 'Product Manager', id: 1, skills: [
                    {title: 'Analytical', id: 1},
                    {title: 'Active Listening', id: 2},
                    {title: 'Collaboration', id: 3},
                    {title: 'Negotiating', id: 4},
                    {title: 'Teamwork', id: 5},
                    {title: 'Communication', id: 6},
                    {title: 'Problem Solving', id: 6}

                ]
            },
            {
                title: 'Product Owner', id: 2, skills: [
                    {title: 'Analytical', id: 1},
                    {title: 'Active Listening', id: 2},
                    {title: 'Collaboration', id: 3},
                    {title: 'Negotiating', id: 4},
                    {title: 'Teamwork', id: 5},
                    {title: 'Communication', id: 6},
                    {title: 'Problem Solving', id: 6}

                ]
            },
            {
                title: 'Product Marketing Manager', id: 3, skills: [
                    {title: 'Analytical', id: 1},
                    {title: 'Active Listening', id: 2},
                    {title: 'Collaboration', id: 3},
                    {title: 'Negotiating', id: 4},
                    {title: 'Teamwork', id: 5},
                    {title: 'Communication', id: 6},
                    {title: 'Problem Solving', id: 6}

                ]
            },
            {
                title: 'Chief Product Officer', id: 4, skills: [
                    {title: 'Analytical', id: 1},
                    {title: 'Active Listening', id: 2},
                    {title: 'Collaboration', id: 3},
                    {title: 'Negotiating', id: 4},
                    {title: 'Teamwork', id: 5},
                    {title: 'Communication', id: 6},
                    {title: 'Problem Solving', id: 6}

                ]
            },
            {
                title: 'Group Product Manager', id: 5, skills: [
                    {title: 'Analytical', id: 1},
                    {title: 'Active Listening', id: 2},
                    {title: 'Collaboration', id: 3},
                    {title: 'Negotiating', id: 4},
                    {title: 'Teamwork', id: 5},
                    {title: 'Communication', id: 6},
                    {title: 'Problem Solving', id: 6}

                ]
            },
        ];
    }

    ngOnInit() {
        this.storage.get('jobId').then((value) => {
            console.log(value);
            this.jobId = value;
        });
    }

    onClick(): void {
        this.router.navigate(['/tags']);
    }

}
