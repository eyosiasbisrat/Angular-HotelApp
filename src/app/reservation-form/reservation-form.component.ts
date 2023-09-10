import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{
  reservationForm: FormGroup = new FormGroup({}); 
  
  constructor(
    private formBuilder: FormBuilder,
    private reservationService:ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute ){

  }
  ngOnInit(): void {
      this.reservationForm = this.formBuilder.group({
        checkInDate: ['',Validators.required],
        checkOutDate:['',Validators.required],
        guestName:['',Validators.required],
        guestEmail:['',[Validators.required,Validators.email]],
        roomNumber:['',Validators.required]
        

      });//we are creating a new group(or we are grouopng multiple controlls) when this componet gets initialized
  
      let id= this.activatedRoute.snapshot.paramMap.get('id');//we check if the activated route has an 'id'
      if(id){
        let reservation = this.reservationService.getReservation(id);//we recocer the reservation
        if(reservation){this.reservationForm.patchValue(reservation);}//we patch all of the values from the reservation into the form.
        
      }
    }

    

  onSubmit() {

        if(this.reservationForm.valid){

          let reservation: Reservation = this.reservationForm.value;
          
          let id= this.activatedRoute.snapshot.paramMap.get('id');

          if(id){         
            this.reservationService.updateReservation(id,reservation);
          }else{
            this.reservationService.addReservation(reservation);

          }
           console.log(reservation)
           this.router.navigate(['/list'])
        }
       
    }
}
