import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import 'jqueryui'
import 'datatables.net-bs5'
import { MessagesService } from '../services/messages.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotelhome-page',
  templateUrl: './hotelhome-page.component.html',
  styleUrls: ['./hotelhome-page.component.css'],
})
export class HotelhomePageComponent implements OnInit {
  form!:FormGroup
  constructor(public service: MessagesService,fb:FormBuilder) {
this.form = fb.group({
  FullName:"",
  email:"",
  Phonenumber:"",
  isStaff:"",
})
  }

  ngOnInit(): void {
    this.loadTable()
  }
  loadTable() {
    this.service.getUsers().subscribe({
      next: (response: any) => {
        $("#grid").dataTable({
          dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
          pageLength: 5, // page length
          pagingType: "numbers",
          retrieve: true,
          order: [[0, 'asc']], //order table
          data: response,
          //   columns:[
          //     {
          //            data: "name", width: "2%"

          //        },
          //        {
          //         data: "diameter", width: "2%"

          //     },
          //     {
          //       data: "climate", width: "2%"

          //   },
          //   {
          //     data: "terrain", width: "2%"

          // },
          // {
          //       data: null, width: "2%",
          //       render: function (data) {
          //          return `<button type="button"   class="btn btnEdit" style= "background-color:#fea115"  >Edit</button>`
          //        }

          // }
          //       ]
          columns: [

            {
              data: null, width: "2%",
              render: function (data) {
                return data.first_name + ' ' + data.last_name
              }
            },
            {
              data: "email", width: "2%"

            },
            {
              data: "phone_number", width: "2%"

            },
            {
              data: "is_staff", width: "2%"

            },

            {
              data: null,
              width: "2%",
              render: function (data) {
                return `<button type="button" class="btn btn-primary btnEdit" (click)="onEdit(user)">Edit</button>`;
              },

            }

          ]
        })

        $("#grid tbody").on("click",".btnEdit",(thisbutton)=>{
          $("#ModalContent").draggable()
            var self =thisbutton.currentTarget
            var rowIndex = $(self).parents('tr');
           
             var data =  $("#grid").DataTable() .row(rowIndex).data()
           
       this.form.patchValue({
        FullName:data.first_name + ' ' + data.last_name,
        email: data.email,
        Phonenumber: data.phone_number,
        isStaff: data.is_staff==true?"Yes":"No",
       })
           $("#ModalContent").show()
          });

      },

      error: (error) => {
        console.log(error)
      }
    })


  
  }
  saveForm(form:FormGroup){
if(form.pristine){
  alert("Tada! changes has been made")
}else{
  console.log(form.value)
}
  }

  Modalclose(){
    $("#ModalContent").hide()
  }

}
