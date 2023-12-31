import { Component } from '../core/component'
import { apiSevice } from '../services/api.service'
import { renderPost } from '../templates/post.template'

export class FavoriteComponent extends Component {
  constructor(id, options) {
    super(id)
    this.loader = options.loader
  }

  init(){
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

 

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) 
    const html = renderList(favorites)
    this.$el.insertAdjacentHTML('afterbegin', html)
  }

  onHide(){
    this.$el.innerHTML = ""
  }
}

async function linkClickHandler(event) {
  event.preventDefault()

  if (event.target.classList.contains('js-link')) {
    const postId = event.target.textContent
    this.$el.innerHTML = ""
    this.loader.show()
    const post = await apiSevice.fetchPostById(postId)
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}))
  }
}

function renderList(list = []) {
  if (list.length) {
    return `
      <ul>
        ${list.map(i => `<li><a href="#" class="js-link">${i}</a></li>`).join(' ')}
      </ul>
    `
  }

  return `<p class="center">Р’С‹ РїРѕРєР° РЅРёС‡РµРіРѕ РЅРµ РґРѕР±Р°РІРёР»Рё</p>`
}