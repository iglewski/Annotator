import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})

export class CreateProjectComponent implements OnInit {
  project = { 'id': '', 'title': '', 'description': '', 'admin': '' };

  constructor(public router: Router, private afs: AngularFirestore){ }

  ngOnInit() { }

  create(){
    if (this.project.title != null && this.project.title != '' &&
        this.project.description != null && this.project.description != '') {

      this.project.admin = firebase.auth().currentUser.uid;
      this.project.id = this.afs.createId();

      this.afs.collection('Projects').doc(this.project.id).set(this.project);

      this.router.navigate(['/']);
      //this.router.navigate(['project']);
    }
  }
}
