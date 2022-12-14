


function visibleImage_perfil(url){
    const container = document.querySelector(".Continput_imgPerfil")
    let img_container = document.createElement("div")
    img_container.classList.add("imgPerfil_container")

    let img = document.createElement("img")
    img.classList.add("imageAm_perfil")
    img_container.appendChild(img)

    img.src = url
    if(document.querySelector(".image_amoster")){
        document.querySelector(".image_amoster").remove()
        container.appendChild(img_container)
    }else{
        document.querySelector(".imgPerfil_container").remove()
        container.appendChild(img_container)
    }
}



document.addEventListener("DOMContentLoaded", ()=>{
    tela_carregamento(true)
    condition_appendFicha(appendFichaGonza, ficha_model__Gonza)
})
function condition_appendFicha(appendFicha_function, fichaModel){
    auth.onAuthStateChanged(user => {
        if(user){
            let userDoc = user.uid
            let docRef = db.collection("Players").doc(userDoc)
            docRef.get().then((doc)=>{
                tela_carregamento(false)
                if(doc.data().Fichas.length === 0){
                    appendFicha_function(fichaModel)
                }else{
                    appendAlertEdit("Sua conta só pode ter 1 ficha...", "/console/console.html")
                }
            })
        }else{
            console.log("opa, erro")
        }
    })
}
function appendAlertEdit(msg, ender_return){
    let header = document.querySelector("header")
    header.remove()
    document.body.classList.add("retirairPadding")

    let section = document.createElement("section")
    section.classList.add("alert")
    document.body.appendChild(section)

    let alert = document.createElement("div")
    alert.classList.add("alert_content")
    section.appendChild(alert)

    let gif = document.createElement("img")
    gif.src = "https://i.pinimg.com/originals/c3/5a/e1/c35ae18ff4ae31d8835a477140a7835e.gif"
    alert.appendChild(gif)

    let h1_msg = document.createElement("h1")
    h1_msg.innerText = msg
    alert.appendChild(h1_msg)

    let button = document.createElement("a")
    button.href = ender_return
    button.innerText = "Voltar"
    alert.appendChild(button)
}

function criar_infoFicha(){
    let criar_fichaCreate = document.createElement("section")
    criar_fichaCreate.classList.add("criar_ficha_criate")
    document.body.appendChild(criar_fichaCreate)


    let content_createFicha = document.createElement("div")
    content_createFicha.classList.add("content_criateFicha")
    criar_fichaCreate.appendChild(content_createFicha)


    let inputs_createName = document.createElement("div")
    inputs_createName.classList.add("inputs_criateName")
    content_createFicha.appendChild(inputs_createName)

    let label = document.createElement("label")
    inputs_createName.appendChild(label)

    label.innerHTML = 'Nome da Ficha:<input id="nome_ficha" autofocus type="text" placeholder="Digite o nome da sua ficha" >'


    let cont_input_imgPerfil = document.createElement("div")
    cont_input_imgPerfil.classList.add("Continput_imgPerfil")
    content_createFicha.appendChild(cont_input_imgPerfil)

    let image_amoster = document.createElement("img")
    image_amoster.classList.add("image_amoster")
    image_amoster.src = "https://cdna.artstation.com/p/assets/images/images/031/209/428/original/krzysztof-pixel-matys-96-idle-v5.gif?1602934264"
    cont_input_imgPerfil.appendChild(image_amoster)

    let Label_input_image = document.createElement("label")

    Label_input_image.addEventListener("change",(ev)=>{
        let input_value = ev.target.files[0]
        if(input_value){
            let reader = new FileReader()
            reader.addEventListener("load", (ev)=>{
                let readerTarget = ev.target
                visibleImage_perfil(readerTarget.result)
                url_img = readerTarget.result
            })
            reader.readAsDataURL(input_value)
        }else{{
            console.log("Deu ruim")
        }}
    })
    
    Label_input_image.classList.add("Label-input_image")
    cont_input_imgPerfil.appendChild(Label_input_image)

    Label_input_image.innerHTML = '<input type="file" accept="image/*" class="input-image">Escolha uma imagem'
}

function appendFichaGonza(ficha_infos){

    criar_infoFicha()

    let ficha_container = document.createElement("section")
    ficha_container.classList.add("ficha_container")
    document.body.appendChild(ficha_container)

    let title_ficha = document.createElement("h1")
    title_ficha.innerText = inf_FichaGonza.nome_model
    ficha_container.appendChild(title_ficha)


    //Criando setores de edição de acordo com a predefinição do modelo de ficha
    ficha_infos.forEach(info => createFichaEdit_window(info, ficha_container))

    //Botão para enviar os dados da ficha para o Banco de dados
    let button_enviarFichaDb = document.createElement("button")
    button_enviarFichaDb.classList.add("button_enviarFichaDb")
    button_enviarFichaDb.innerText = "CRIAR SUA FICHA"
    button_enviarFichaDb.addEventListener("click",  ()=> {
        enviar_dadosFichaDb()
    })
    ficha_container.appendChild(button_enviarFichaDb)

    //Definindo que todos os inputs numéricos receberão valor 0
    let inputsNumber_global = document.querySelectorAll("input[type='number']")
    let inputsText_global = document.querySelectorAll("input")

    inputsNumber_global.forEach(input => input.value = 0)
    inputsText_global.forEach(input => input.autocomplete = "off")

    changeInput_addPonto(ficha_infos)
}



function changeInput_addPonto(ficha_infos){
    const inputs_Atributos = document.querySelectorAll(".inputs_atributos")
    const inputs_Pericia = document.querySelectorAll(".inputs_pericias")
    
    inputs_Atributos.forEach(input =>{
        let inputs_Atributos_valores = []
        input.addEventListener("input", ()=>{
            if(input.value > 5){
                input.value = input.innerHTML
            }
            inputs_Atributos_valores.push(Number(input.value))
            let soma_pontos = inputs_Atributos_valores.reduce((acc, val)=>{
                return val + acc
            })
            input.addEventListener("reset", ()=>{
                console.log(input.value)
            })
        })

        
    })
    inputs_Pericia.forEach(input =>{
        input.addEventListener("input", ()=>{
            if(input.value > 5){
                input.value = input.innerHTML
            }
        })
    })     
}



function createFichaEdit_window(info, container){
    let head_fichaCont = document.createElement("div")
    head_fichaCont.classList.add("head_ficha")
    container.appendChild(head_fichaCont)

    let categoriaInP = document.createElement("h2")

    if(info.pontos.estado){
        categoriaInP.id = "idh2_" + info.categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').toLowerCase()
        categoriaInP.innerText = info.categoria + " ["+ info.pontos.quantidade_pontuada + "/" + info.pontos.quantidade_total + "]"
    }else{
        categoriaInP.innerText = info.categoria
    }
    head_fichaCont.appendChild(categoriaInP)


    let ul_inputs = document.createElement("ul")
    head_fichaCont.appendChild(ul_inputs)

    info.chaves.forEach((chave)=>{    
        let class_inputs = "inputs_" + info.categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').toLowerCase()
        if(chave.textarea){
            head_fichaCont.innerHTML += `<label class="label_textarea "><span>${chave.chave_string}:</span><textarea class="textarea_values ${class_inputs}" id="${chave.chave_string}" name="${info.categoria}" ></textarea></label>`
        }else if(info.type_global === "number"){
            ul_inputs.innerHTML += `<label><span>${chave.chave_string}:</span><input id="${chave.chave_string}" type="number" class="input_values ${class_inputs}" ${chave.atributosInput} name="${info.categoria}"></label>`
        }
        else{
            ul_inputs.innerHTML += `<label><span>${chave.chave_string}:</span><input id="${chave.chave_string}" class="input_values ${class_inputs}"  ${chave.atributosInput} name="${info.categoria}"></label>`
        }
    })

}

function tela_carregamento(bool){
    let telaBlur = document.createElement("div")
    telaBlur.classList.add("telaBlur")

    let telaBlur_content = document.createElement("div")
    telaBlur_content.classList.add("telaBlur_content")
    telaBlur.appendChild(telaBlur_content)

    let gif = document.createElement("img")
    gif.src = "https://i.gifer.com/N8dP.gif"
    telaBlur_content.appendChild(gif)

    let h1_mensagem = document.createElement("h1")
    h1_mensagem.innerHTML = "Carregando..."
    telaBlur_content.appendChild(h1_mensagem)

    if(bool){
        document.body.appendChild(telaBlur)
        document.body.classList.add("retirairPadding")
    }else{
        document.querySelector(".telaBlur").remove()
        document.body.classList.remove("retirairPadding")
    }
}

