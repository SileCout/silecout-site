'use strict';
const products = [
{title:'Sites profissionais',category:'Negócios',images:['site1.jpeg'],description:'Uma presença digital com a identidade do seu negócio e contato facilitado com seus clientes.'},
{title:'Chatbot personalizado',category:'Negócios',images:['chatbot.png'],description:'Apresente sua ideia de atendimento e solicite uma solução personalizada para o seu negócio.'},
{title:'Aplicativos personalizados',category:'Negócios',images:['aplicativos1.png'],description:'Soluções sob medida para organizar processos, informações e a rotina do seu negócio.'},
{title:'Catálogo para nutricionistas',category:'Catálogos',images:['catal.nutric.png','catal.nutric1.png','catal.nutric2.png'],description:'Modelo demonstrativo de catálogo para apresentar serviços, planos e formas de atendimento.'},
{title:'Catálogo para odontologia',category:'Catálogos',images:['catal.odont..png','catal.odont2.png','catal.odont3.png'],description:'Modelo demonstrativo para apresentar sua clínica e organizar seus serviços em um catálogo.'},
{title:'Catálogo para beleza e estética',category:'Catálogos',images:['catal.salao1.png','catal.salao2.png','catal.salao3.png'],description:'Modelo demonstrativo para salões e estúdios, personalizado com a identidade da sua marca.'},
{title:'Catálogo para psicólogos',category:'Catálogos',images:['catal.psicol.png'],description:'Modelo demonstrativo com uma apresentação acolhedora das especialidades e do atendimento.'},
{title:'Catálogo para terapias integrativas',category:'Catálogos',images:['catal.terap0.png','catal.terap.png'],description:'Modelo demonstrativo para apresentar seu espaço, suas sessões e suas formas de contato.'},
{title:'Livro de histórias infantis',category:'Memórias',images:['livro-infantil.png'],description:'Uma história personalizada com o nome da criança e ilustrações encantadoras. Entrega digital em PDF, para ler, guardar e recordar.'},
{title:'Kit Memórias Eternas',category:'Memórias',images:['kitpresente.png'],description:'Foto restaurada, música personalizada, vídeo de homenagem e cartão digital com QR Code.',price:'R$ 79,90'},
{title:'Músicas personalizadas',category:'Memórias',images:['musicas.png'],description:'Sua história em uma música para aniversários, casamentos, homenagens e momentos especiais.',price:'A partir de R$ 19,90'},
{title:'Restauração de fotos',category:'Memórias',images:['recuperação de fotos.png','recuperacaofoto.png'],description:'Uma nova vida para fotos antigas e danificadas. Danos graves são avaliados sob orçamento.',price:'1 foto: R$ 10 · 3 fotos: R$ 25'}
];
function serviceSlug(title){return title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function addServiceLink(card,slug){card.id=slug;}
const imagePath = name => 'imagens/' + encodeURIComponent(name);
const grid = document.querySelector('#products');
function render(filter='Todos') {
 grid.replaceChildren();
 document.querySelector('.catalog-note').hidden=filter!=='Catálogos';
 let back=document.querySelector('#catalog-back');
 if(!back){back=document.createElement('button');back.id='catalog-back';back.className='catalog-back';back.textContent='← Voltar para todos os serviços';back.addEventListener('click',()=>document.querySelector('[data-filter="Todos"]').click());grid.before(back);}
 back.hidden=filter!=='Catálogos';
 products.forEach((product,index)=>{
  if(filter!=='Todos' && product.category!==filter)return;
  if(product.category==='Catálogos' && filter!=='Catálogos'){
   if(index===products.findIndex(p=>p.category==='Catálogos')){
    const entry=document.createElement('article');entry.className='card';
    entry.innerHTML='<button class="image-button catalog-cover" aria-label="Abrir modelos de catálogos"><span class="catalog-symbol" aria-hidden="true">▤</span><strong>CATÁLOGOS</strong><span>Uma apresentação com a<br>identidade do seu negócio.</span><span class="catalog-cover-link">Conhecer os modelos ↗</span></button><p class="card-category">PARA SEU NEGÓCIO</p><h3>Catálogos personalizados</h3><p class="description">Explore modelos demonstrativos e inspire-se para criar o catálogo do seu negócio.</p><div class="card-bottom"><span class="price">Feito para sua marca</span><button class="order">Ver modelos ↗</button></div>';
    entry.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{document.querySelector('[data-filter="Catálogos"]').click();document.querySelector('#catalogo').scrollIntoView({behavior:'smooth'});}));addServiceLink(entry,'catalogos');grid.append(entry);
   }
   return;
  }
  const card=document.createElement('article');card.className='card';
  card.innerHTML=`<button class="image-button" aria-label="Ampliar: ${product.title}"><img src="${imagePath(product.images[0])}" alt="${product.title}${product.category==='Catálogos'?' — modelo demonstrativo':''}" loading="lazy"><span class="zoom-tag">${product.images.length>1?product.images.length+' artes · ':''}Ampliar ↗</span></button><p class="card-category">${product.category==='Catálogos'?'CATÁLOGO DEMONSTRATIVO':product.category==='Negócios'?'PARA SEU NEGÓCIO':'PRESENTES E MEMÓRIAS'}</p><h3>${product.title}</h3><p class="description">${product.description}</p><div class="card-bottom"><span class="price">${product.price||'Sob orçamento'}</span><button class="order">Pedir orçamento ↗</button></div>`;
  card.querySelector('.image-button').addEventListener('click',()=>openGallery(index));
  card.querySelector('.order').addEventListener('click',()=>openQuote(product.title));addServiceLink(card,serviceSlug(product.title));grid.append(card);
 });
 if(filter==='Catálogos'){
 const custom=document.createElement('article');custom.className='card custom-catalog';
 custom.innerHTML='<div class="custom-catalog-blank"><span class="catalog-symbol" aria-hidden="true">＋</span><p>Seu negócio.<br>Sua identidade.<br><em>Seu catálogo.</em></p><span>Este espaço pode ser da sua marca.</span></div><p class="card-category">FEITO PARA VOCÊ</p><h3>Peça o orçamento do seu catálogo, para o seu negócio</h3><p class="description">Não encontrou sua área nos exemplos? Conte o que você faz e o que deseja apresentar aos seus clientes.</p><div class="card-bottom"><span class="price">Sob orçamento</span><button class="order">Pedir orçamento ↗</button></div>';
 custom.querySelector('.order').addEventListener('click',()=>openQuote('Catálogo para meu negócio'));addServiceLink(custom,'catalogo-para-meu-negocio');grid.append(custom);
 }
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});render(button.dataset.filter);}));
const gallery=document.querySelector('#gallery');let currentProduct=0,currentImage=0;
function updateGallery(){const product=products[currentProduct];document.querySelector('#gallery-title').textContent=product.title;const img=document.querySelector('#gallery-image');img.src=imagePath(product.images[currentImage]);img.alt=product.title+' — arte '+(currentImage+1);document.querySelector('#gallery-counter').textContent=`${currentImage+1} de ${product.images.length}`;document.querySelector('#previous').disabled=currentImage===0;document.querySelector('#next').disabled=currentImage===product.images.length-1;}
function openGallery(index){currentProduct=index;currentImage=0;updateGallery();gallery.showModal();gallery.scrollTop=0;}
document.querySelector('#previous').addEventListener('click',()=>{if(currentImage>0){currentImage--;updateGallery();}});
document.querySelector('#next').addEventListener('click',()=>{if(currentImage<products[currentProduct].images.length-1){currentImage++;updateGallery();}});
gallery.addEventListener('keydown',event=>{if(event.key==='ArrowRight')document.querySelector('#next').click();if(event.key==='ArrowLeft')document.querySelector('#previous').click();});
const quote=document.querySelector('#quote');const select=document.querySelector('#service');
[...products.map(p=>p.title),'Catálogo para meu negócio','Outra ideia'].forEach(title=>{const option=document.createElement('option');option.value=title;option.textContent=title;select.append(option);});
function openQuote(service){select.value=service;quote.showModal();quote.scrollTop=0;}
document.querySelector('#general-quote').addEventListener('click',()=>openQuote('Outra ideia'));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});});
document.querySelector('#quote-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;const data=new FormData(form);const name=data.get('name').trim();const details=data.get('details').trim();if(!name||!details){const field=!name?form.elements.name:form.elements.details;field.setCustomValidity('Preencha este campo com as informações do pedido.');field.reportValidity();field.addEventListener('input',()=>field.setCustomValidity(''),{once:true});return;}const message=`Olá, SileCout! Gostaria de pedir um orçamento.\n\nNome: ${name}\nServiço: ${data.get('service')}\nDetalhes: ${details}${data.get('deadline').trim()?'\nPrazo desejado: '+data.get('deadline').trim():''}\n\nVim pelo site da SileCout.`;window.open('https://wa.me/5532998125881?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');});
render();

const themeToggle=document.querySelector('#theme-toggle');
function syncThemeButton(){const dark=document.documentElement.dataset.theme==='dark';themeToggle.setAttribute('aria-pressed',String(dark));themeToggle.setAttribute('aria-label',dark?'Ativar modo dia':'Ativar modo noite');themeToggle.replaceChildren(document.createTextNode(dark?'☀ ':'☾ '));const text=document.createElement('span');text.textContent=dark?'Dia':'Noite';themeToggle.append(text);}
themeToggle.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('silecout-theme',theme)}catch{}syncThemeButton();});
syncThemeButton();

function followServiceLink(){
 const slug=decodeURIComponent(location.hash.slice(1));if(!slug)return;
 const product=products.find(p=>serviceSlug(p.title)===slug);
 const isCustom=slug==='catalogo-para-meu-negocio';
 if(!product && !isCustom && slug!=='catalogos')return;
 const filter=(product?.category==='Catálogos'||isCustom)?'Catálogos':'Todos';
 document.querySelector('[data-filter="'+filter+'"]').click();
 const target=document.getElementById(slug);
 if(target)requestAnimationFrame(()=>{target.scrollIntoView({behavior:'instant',block:'start'});target.classList.add('linked-service');setTimeout(()=>target.classList.remove('linked-service'),3000);});
}
window.addEventListener('hashchange',followServiceLink);
followServiceLink();
