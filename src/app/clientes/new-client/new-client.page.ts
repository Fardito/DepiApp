import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ClientesService } from "../clientes.service";

@Component({
  selector: "app-new-client",
  templateUrl: "./new-client.page.html",
  styleUrls: ["./new-client.page.scss"],
})
export class NewClientPage implements OnInit {
  @ViewChild("f") form: NgForm;

  constructor(private router: Router, private clientService: ClientesService) {}

  ngOnInit() {}

  onCreateClient() {
    if (!this.form.valid) {
      return;
    }
    const id = (Math.random() * 6 + 1).toString();
    
    this.clientService.addClient(
      id,
      this.form.value["first-name"],
      this.form.value["last-name"],
      this.form.value["celPhone"],
      this.form.value["sesiones"]
    );
    this.form.reset();
    this.router.navigate(["/clientes"]);
  }
}
