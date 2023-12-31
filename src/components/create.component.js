import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'
import { apiSevice } from '../services/api.service'

export class CreateComponent extends Component {
  constructor(id) {
    super(id)
  }

  init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))

    this.form = new Form(this.$el, {
      title: [Validators.required],
      fulltext: [Validators.required, Validators.minLength(3)]
    })
  }
}

async function submitHandler(event) {
  event.preventDefault()

  if(this.form.isValid()){
    const formData = {
      type: this.$el.type.value,
      date: new Date().toLocaleDateString(),
      ...this.form.value()
    }
    
    await apiSevice.createPost(formData)
    this.form.clear()
    alert("Запись создана в базе данных")
  }

}