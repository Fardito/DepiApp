import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FechasService } from '../fechas.service';

@Component({
  selector: 'app-new-fecha',
  templateUrl: './new-fecha.page.html',
  styleUrls: ['./new-fecha.page.scss'],
})
export class NewFechaPage implements OnInit {
  @ViewChild('f') form: NgForm;

  myDate: string;


  constructor(private fechaService: FechasService, private router: Router) { }

  ngOnInit() {
  }

  onAddFecha(){
    const id = (Math.random() * 6 + 1).toString();
    this.fechaService.addFecha(id,this.form.value['fecha-inicial']);
    this.form.reset();
    this.router.navigate(['/fechas']);
  }
}
