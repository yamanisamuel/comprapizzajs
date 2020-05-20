/*
O quereSelector será usado várias vezes,
para facilitar e organizar o código, foi criado 
estas constantes que recebem uma função que retorna
o objeto encontrado, no caso da qs(querySelector) e 
uma array com todos os elementos encontrados no caso
do qsAll(querySelectorAll).
*/
const qs = (nomeElemento) => {
    return document.querySelector(nomeElemento);
}

const qsAll = (nomeElemento) => {
    return document.querySelectorAll(nomeElemento);
}


//Início criação das pizzas na tela

/*
Variável que armazena o index da pizza selecionada
*/
let keyPizzaModal = 0;

/*
Aqui é a variável que armazena a quantidade
da pizza selecionada. Inicia com o valor padrão
1
*/
let pizzaModalQt = 1;

/*
Este array armazena as informações das pizzas selecionadas
como o index da pizza, a quantidade e o tamanho.
*/
let cart = [];

/*
O map lê o json item a item. O código abaixo acontece para cada item do json pizzaJason.
Lembrando que o pizzaJason é o arquivo pizzas.js que está sendo usado para simular 
requisições ao banco de dados.
Este bloco faz a listagem das pizzas na tela e cria o modal de cada uma.
*/
pizzaJson.map((item, index) => {
    //Aqui clora para o item atual, todo o conteúdo que estiver dentro destes elementos
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    /*
    Atribui um identificador a div de cada item para saber
    qual pizza foi selecionada e recuperar seus dados posteriormente.
    O data-key é adicionado a div da pizza com seu index.
    <div class="pizza-item" data-key="0">...</div>
    */
    pizzaItem.setAttribute('data-key', index);

    /*
    Preenche com as informações da pizza atual.
    Aqui usa-se innerHTML para substituir as informações do models original
    com as informações corretas da pizza.
    */
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[0].toFixed(2).toString().replace('.', ',')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    /*
    Cancela o comportamento padrão da tag <a> que é
    atualizar a página e abre o modal com informações da pizza.
    Só tem uma tag <a> em pizza-item, então pode selecionar com 
    querySelector que não terá problemas.
    
    Aqui ouve o evento de click e a arrow fuction recebe o evento em si.
    Aqui nesse bloco preenche o modal com as informações da pizza selecionada 
    e abre o modal.
    */
    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
        /*
        Essa linha previne a ação padrão. Neste caso seria atualizar a página
        e com esse comando não irá realizar a ação padrão.
        */
        e.preventDefault();

        /*
        Aqui estamos dentro da tag <a> e temos que pegar o id da 
        pizza que está na div pizza-item que é o elemento acima 
        do <a>. 
        O e.target faz referência ao próprio elemento que neste
        caso é a tag <a>.
        O closest('nome do elemento que se procura') procura o elemento 
        mais próximo apartir da tag <a> pois é dentro de <a> que estamos 
        com o comando abaixo.
        Começa a procura dentro de <a> e depois fora.
        Quando encontrar o elemento procurado o getAttribute pega o valor do data-key.        
        A informação com o index da pizza será armazenada na variável
        key.
        */
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        /*
        Seta o index da pizza selecionada na variável keyPizzaModal
        que será usada para identificar a pizza no carrinho de compras.
       */
        keyPizzaModal = key;

        /*
        Seta o valor 1 para o campo quantidade toda vez que abrir o modal
        da pizza
        */
        pizzaModalQt = 1;

        /*
        Aqui preenche as informações da pizza selecionada no modal
        */
        qs('.pizzaBig img').src = pizzaJson[key].img;

        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qs('.pizzaInfo--pricearea .pizzaInfo--sector').innerHTML = `PREÇO (R$ ${pizzaJson[keyPizzaModal].price[0].toFixed(2).toString().replace('.',',')})`;
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[0].toFixed(2).toString().replace('.', ',')}`;
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[keyPizzaModal].price[0].toFixed(2).toString().replace('.', ',')}`;

        /*
        Aqui irá remover a classe selected no item que estiver com as classes
        pizzaInfo--size e selected ao mesmo tempo, por isso, usa-se o ponto
        e não espaço para encontrar a classe.
        Remove a classe no momento da criação do modal mas logo abaixo
        adiciona novamente.
        */
        qs('.pizzaInfo--size.selected').classList.remove('selected');

        /*
        Aqui faz um querySelctAll pois existe três campos  de tamanho 
        das pizzas que são o pequeno, médio e grande. O querySelectAll
        retorna um array com os intens encontrados.
        */
        qsAll('.pizzaInfo--size').forEach((itemTam, indexItemTam) => {
            /*
            Aqui adiciona a classe selected apenas ao item que 
            será o tamanho pequeno (é o index 0) no momento da 
            criação do modal.
            */
            if (indexItemTam == 0) {
                itemTam.classList.add('selected');
            }

            /*
            Aqui altera o span que está dentro do pizzaInfo--size com
            as informações de tamanho do arquivo pizzas.js.
            Note que pizzaJason usa key que é o index da pizza selecionada,
            já o sizes usa indexItemTam que é o index do tamanho.
            */
            itemTam.querySelector('span').innerHTML = pizzaJson[key].sizes[indexItemTam];

        });

        /*
        Atribui o valor da variável pizzaModalQt ao campo de 
        quantidade do modal da pizza criada.
        */
        qs('.pizzaInfo--qt').innerHTML = pizzaModalQt;

        /*
        Aqui faz o modal pizzaWindowArea aparecer com um efeito 
        de abertura mais lenta. O opacity deixa o modal pizzaWindowArea
        completamente transparente. Em conjunto com o transiton do css
        do modal pizzaWindowArea que todas modificações irão demorar meio
        segundo para acontecer, então a opacidade do modal irá ir de 0
        para um em meio segundo, dando o efeito de abertura lenta. 
        */
        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        /*
        Tem que usar o setTimeout, pois o javascript é muito rápido
        e o opacity iria receber 1 de uma vez, e o setTimeout cria um
        delay de um quinto de segundo, assim dando tempo da opcacity
        receber 0 e a transition funcionar mudando a opacity lentamente
        de 0 para 1.
        */
        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1;
        }, 200);

    });


    /*
    Insere na div pizza-area a pizza com as informações preenchidas.
    Esta sim será exibida na tela.
    append adiciona item e innerHtml sobreescreve.
    */
    qs('.pizza-area').append(pizzaItem);
});


//Fim criação das pizzas na tela

//Início criação dos eventos do MODAL

var tamanhoPizza = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'));

/*
Aqui faz o evento de click nos tamanhos.

Aqui faz um querySelctAll pois existe três campos  de tamanho 
das pizzas que são: pequeno, médio e grande. O querySelectAll
retorna um array com os itens encontrados.
*/
qsAll('.pizzaInfo--size').forEach((itemTam, indexItemTam) => {
    /*
    Aqui faz o procedimento padrão para seleções de itens. Primeiro
    procura e remove a classe de seleção do item que estiver selecionado
    e depois adiciona a classe de seleção no item que foi selecionado.
    Lembrando que acima tem o código definindo o tamanho pequeno como
    padrão e toda vez que fechar o modal e abrir novamente o tamanho 
    PEQUENO estará selecionado.
    Depois chamo o updatePricePizza para atualizar o valor da pizza 
    de acordo com o tamanho selecionado.
    */
    itemTam.addEventListener('click', () => {
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        itemTam.classList.add('selected');
        tamanhoPizza = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'));

        qs('.pizzaInfo--pricearea .pizzaInfo--sector').innerHTML = `PREÇO (R$ ${pizzaJson[keyPizzaModal].price[tamanhoPizza].toFixed(2).toString().replace('.',',')})`;

        qs('.pizzaInfo--qt').innerHTML = pizzaModalQt;

        updatePricePizza(pizzaModalQt);    
    });
});

/*
Cria os eventos dos botões(estão como tags button) - e + do modal. O menos
não pode definir o valor menor que 1.
*/
//Botão de -
qs('.pizzaInfo--qtmenos').addEventListener('click', () => {
    /*
    Esta variável foi definida acima. Ela armazena a quantidade de pizzas
    que aparece entre os botões - e +
    */
    if(pizzaModalQt > 1){
        pizzaModalQt--;
        qs('.pizzaInfo--qt').innerHTML = pizzaModalQt;
        //Atualiza o valor
        updatePricePizza(pizzaModalQt);
    }
});

//Botão de +
qs('.pizzaInfo--qtmais').addEventListener('click', () => {
    /*
    Esta variável foi definida acima. Ela armazena a quantidade de pizzas
    que aparece entre os botões - e +
    */
    pizzaModalQt++;
    qs('.pizzaInfo--qt').innerHTML = pizzaModalQt;
    //Atualiza o valor
    updatePricePizza(pizzaModalQt);        
});


qs('.pizzaInfo--addButton').addEventListener('click', () => {
    /*
    Pega o tamanho. O atributo data-key está definido na tag no html.
    Cada tamanho tem um data-key que no exemplo são 0 para pequena
    1 para média e 2 para grande.
    Faz a conversão do data-key retornado para o tipo inteiro com o
    parseInt pois ele vem como String.
    */
    tamanhoPizza = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'));   

    /*
    Cria o identificador concatenando o id com um símbolo qualquer e o tamanho
     */
    let identificador = pizzaJson[keyPizzaModal].id + '@' + tamanhoPizza;

    /*
    Verifica se a pizza que está sendo adicionada no momento já existe no carrinho
    com o mesmo identificador. Se existir retorna o index da pizza no carrinho se 
    não existir retorna -1.
    Como é um item apenas que está sendo verificado pode retirar o return e fazer 
    em uma linha como no exemplo abaixo.
    */
    let indexNoCarrinho = cart.findIndex((item) => item.identificador == identificador);

    /*
    Se o indexNoCarrinho for maior que -1 tem que somar a quantidade no item selecionado
    no carrinho. Se não tem que adicionar um novo item ao carrinho.
    */
    if (indexNoCarrinho > -1) {
        /*Soma a quantidade do item no carrinho com a quantidade
        do modal
        */
        cart[indexNoCarrinho].quantidade += pizzaModalQt;
    } else {
        /*
        Adiciona os itens ao carrinho
        */
        cart.push({
            identificador,
            id: pizzaJson[keyPizzaModal].id,//Aqui busca o id da pizza no arquivo json
            tamanhoPizza,//Aqui pode usar assim ou tamanhoPizza: tamanhoPizza, pois tem o mesmo nome
            quantidade: pizzaModalQt
        });
    }

    /*
    Atualiza o carrinho de compras. A ordem de chamada dos
    functions updateCart e closeModal não importa, mas achei
    melhor assim pra manter uma ordem cronológica.
    */
    updateCart();

    /*
    Depois de clicar em adicionar ao carrinho tem que fechar o modal.
    Para isso só chamar o function que fecha o modal criado anteriormente.
    */
    closeModal();
});

/*
Aqui procura pelos botões Cancelar e Voltar que aparece apenas 
nos celulares e adiciona o evento de clique chamando a function 
closeModal que fecha a modal. 
Lembrando que não são tags <button> e nem <a> e sim <div> com
suas respectivas classes.
*/
/*
Note que tem uma vírgula separando as classes dos botões. Esse querySelectorAll
que busca dois itens irá gerar uma array, por isso tem que usar o forEach 
que recebe item a item para adicionar o evento em cada botão.
*/
qsAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});



/*
Apenas para mobile. Aqui adiciona o evento de clique no carrinho
do mobile para abrir. Se o carrinho tiver pelo menos uma pizza 
mostra o aside que tem a lista de pizzas selecionadas e seus valores.
No mobile a exibição ficou diferente, apenas 'puxa' o aside para a 
esquerda.
*/
qs('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        qs('aside').style.left = '0';
    }    
});
/*
Adiciona o evento de clique para o X que aparece
apenas para mobile.
Para fechar 'puxa' o aside para a direita.
*/
qs('.menu-closer').addEventListener('click', ()=>{
    qs('aside').style.left = '100vw';
});
 /*Apenas para mobile*/



/*
    Atualiza o carrinho de compras. Este function irá exibir o carrinho na 
    parte lateral se ainda não estiver sendo exibo e atualiza o carrinho
    se já estiver sendo exibido.
*/
function updateCart() {
    /*
    Apenas para mobile. Aqui atualiza a quantidade
    no carrinho que aparece no topo da tela dos
    mobile. O menu-openner é o carrinho.
    */
    qs('.menu-openner span').innerHTML = cart.length;
    /*Apenas para mobile*/

    /*
    Verifica se o carrinho tem algum item,
    se tiver mostra o carrinho se não fecha
    o carrinho. Tudo que estiver na tag 
    aside faz parte do carrinho, por isso
    que a classe show criada no css é aplicada
    a essa tag.
    */
    if (cart.length > 0) {
        qs('aside').classList.add('show');

        /*
        Limpa o carrinho para que pizzas iguais
        não sejam adcionadas como um novo item
        e apenas soma as quantidades.
        */
        qs('.cart').innerHTML = '';

        /*
        Variáveis para cálculo do subtotal, desconto e total
        */
        let subtotal = 0;
        let total = 0;
        let desconto = 0;
        /*
        Aqui armazena todas as informações das pizzas 
        selecionadas, buscando no arquivo json as informações
        com o id da pizza que está no carrinho.
        */
        for (let i in cart) {
            let pizzaItemCart = pizzaJson.find((item) => item.id == cart[i].id);

            /*
            Calcula o subtotal
            */
            subtotal += pizzaItemCart.price[cart[i].tamanhoPizza] * cart[i].quantidade;
            /*
            Aqui clona o modelo do carrinho
            */
            let cartItem = qs('.models .cart--item').cloneNode(true);

            /*
            Preenche as informações da pizza. Para identificar
            os tamanhos de  cada pizza, faz um switch no tamanho
            que está no carrinho, mudando o número por letras
            correspondentes: P, M e G. 
            */
            let pizzaSizeName;
            switch (cart[i].tamanhoPizza) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            /*
            Aqui pega o valor unitário da pizza de acordo com seu tamanho
            */
            let priceUniPizza = pizzaItemCart.price[cart[i].tamanhoPizza];
            /*
            Aqui concatena o nome da pizza com seu tamanho
            */
            let pizzaName = `${pizzaItemCart.name} (${pizzaSizeName})`;

            /*
            Aqui preenche as informações de fato no carrinho       
            */
            cartItem.querySelector('img').src = pizzaItemCart.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item-priceuni').innerHTML = `R$ ${priceUniPizza.toFixed(2).toString().replace(".",",")}`;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].quantidade;
            /*
            Aqui cria o evento de clique dos botões - e + de quantidades do carrinho.            
            */
            //Botão de -
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                /*
                Se tiver item subtrai um, se subtrair e a quantidade for para menor que um
                remove o item do carrinho.
                */
                if (cart[i].quantidade > 1) {
                    cart[i].quantidade--;
                } else {
                    /*
                    splice recebe o item e quantos itens devem ser excluídos 
                    apartir do item passado.
                    */
                    cart.splice(i, 1);

                }
                
                //Atualiza o carinho
                updateCart();
            });
            //Botão de +      
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                //Adiciona mais um na quantidade da pizza
                cart[i].quantidade++;

                //Atualiza o carinho
                updateCart();

            });
            /*
            Aqui adiciona a pizza ao carrinho
            */
            qs('.cart').append(cartItem);
        }//Fim do for

        /*
        Calcula desconto de 10% em cima do subtotal
        */
        desconto = subtotal * 0.1;
        /*
        Calcula total
        */
        total = subtotal - desconto;
        /*
        Na div de subtotal, desconto e total tem dois span e o valor 
        tem que ir para o último span. Para isso usa o last-child
        */
        qs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2).toString().replace(".",",")}`;
        qs('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2).toString().replace(".",",")}`;
        qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2).toString().replace(".",",")}`;

    } else {
        qs('aside').classList.remove('show');
        /*
        Apenas para mobile. Fecha o modal quando retira todas as pizza ao
        clicar no botão - na quantidade de pizza.
        Para fechar 'puxa' o aside para a direita.
        */
        qs('aside').style.left = '100vw';
    }
}
//Fim function updateCart

/*
Atualiza o valor a ser pago de acordo com a quantidade da pizza.
*/
function updatePricePizza(pizzaModalQt){
    let priceToPay = 0;   
    priceToPay = pizzaJson[keyPizzaModal].price[tamanhoPizza] * pizzaModalQt;   
    qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${priceToPay.toFixed(2).toString().replace('.', ',')}`;
 }

/*
Como o botões não são links e sim div, não precisará
fazer como no link no código acima que tem que cancelar
a ação padrão que atualiza a tela, pois aqui não terá essa
ação.
Essa function será usada nos botões de Cancelar, no botão Voltar
que aparece apenas nos celulares e no botão Adicionar ao carrinho
*/
function closeModal() {
    /*
    Cria o efeito de fechar lentamente, ou seja, faz o inverso
    de abrir, o opacity recebe 0, mas isso apenas faz o modal 
    ficar transparente, ele ainda estará acima dos itens e não
    será possível clicar em mais nunhma pizza, então tem que 
    colocar o setTimeout para esperar meio segundo e atribuir o
    display none no modal.
    */
    qs('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {
        qs('.pizzaWindowArea').style.display = 'none';        
    }, 500);
}