const elParrotsList = document.querySelector(".parrots-wrapper");
const elForm = document.querySelector("form");



function RenderItem(parrot) {


    const item = document.createElement("li");
    item.className = "col-6";

    const cardItem = document.createElement("div");
    cardItem.className = "card";


    const itemImg = document.createElement("img");
    itemImg.src = parrot.img;
    itemImg.className = "card-img-top";
    itemImg.alt = parrot.title;
    itemImg.height = 200;


    const itemBody = document.createElement("div");
    itemBody.className = "card-body";


    const itemName = document.createElement("h3");
    itemName.textContent = parrot.title;
    itemName.className = "card-title";


    const itemPrice = document.createElement("p");
    itemPrice.className = "card-text fw-bold";
    itemPrice.innerHTML = `<mark>$${parrot.price}</mark>`;


    const itemModel = document.createElement("p");
    itemModel.textContent = `${parrot.sizes.width}sm x ${parrot.sizes.height}sm`;
    itemModel.className = "badge bg-success";


    const itemDate = document.createElement("p");
    itemDate.textContent = parrot.birthDate;
    itemDate.className = "card-text";


    const itemBenefitsList = document.createElement("ul");
    itemBenefitsList.className = "d-flex flex-wrap list-unstyled";

    if (parrot.features) {
        const featuresArr = parrot.features.split(",");


        for (let j = 0; j < featuresArr.length; j++) {
            const featureLi = document.createElement("li");
            featureLi.className = "badge bg-primary me-1 mb-1";
            featureLi.textContent = featuresArr[j].trim();
            itemBenefitsList.append(featureLi);
        }
    }


    const creatorElement = function (elName, textContent, className) {
        const createdElement = document.createElement(elName);
        createdElement.textContent = textContent;
        createdElement.className = className;
        return createdElement
    }

    const parrotBtns = creatorElement("div", "", "position-absolute top-0 end-0 d-flex")
    const parrotEditBtn = creatorElement("button", "", "btn rounded-0 btn-secondary");
    parrotEditBtn.setAttribute("data-bs-toggle", "modal");
    parrotEditBtn.setAttribute("data-bs-target", "#edit-parrot-modal");
    parrotEditBtn.setAttribute("data-product-id", products.id);
    const parrotEditBtnIcon = creatorElement("i", "", "fa-solid fa-pen");
    parrotEditBtnIcon.style.pointerEvents = "none";

    parrotEditBtn.append(parrotEditBtnIcon);

    parrotBtns.append(parrotEditBtn);



    const parrotDelBtn = creatorElement("button", "", "btn rounded-0 btn-danger");
    const parrotDelBtnIcon = creatorElement("i", "", "fa-solid fa-trash");
    parrotDelBtnIcon.style.pointerEvents = "none";
    parrotDelBtn.setAttribute("data-id", products.id);
    parrotDelBtn.append(parrotDelBtnIcon);

    parrotBtns.append(parrotDelBtn);


    itemBody.append(parrotBtns);






    itemBody.append(itemName);
    itemBody.append(itemPrice);
    itemBody.append(itemModel);
    itemBody.append(itemDate);
    itemBody.append(itemBenefitsList);

    cardItem.append(itemImg);
    cardItem.append(itemBody);

    item.append(cardItem);
    elParrotsList.append(item);

};

elParrotsList.innerHTML = "";
for (let i = 0; i < products.length; i++) {
    RenderItem(products[i]);
}





const addForm = document.querySelector("#add-product-form");
const addModal = document.querySelector("#add-parrot-modal");
const addModalEl = new bootstrap.Modal(addModal);

const editParrotModal = document.querySelector("#edit-parrot-modal");
const editParrotModalEl = new bootstrap.Modal(editParrotModal);

const editParrotTitle = document.querySelector("#edit-title");
const editParrotImg = document.querySelector("#edit-img");
const editParrotPrice = document.querySelector("#edit-price");
const editParrotDate = document.querySelector("#edit-date");


addForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const elements = evt.target.elements;
    const title = elements["parrot-title"];
    const img = elements["parrot-img"];
    const price = elements.price;
    const date = elements["parrot-date"];
    const width = elements["parrot_width"];
    const height = elements["parrot_height"];
    const features = elements.features;
    if (title.value.trim() && img.value.trim() && price.value.trim() && date.value.trim() && width.value.trim() && height.value.trim()) {



        const newParrot = {
            id: products.length + 1,
            title: title.value,
            img: img.value,
            price: Number(price.value),
            birthDate: new Date().toISOString(),
            sizes: {
                width: width.value,
                height: height.value
            },
            features: features.value
        };

        products.push(newParrot);
        elParrotsList.innerHTML = "";

        products.forEach((parrot) => {
            RenderItem(parrot);
        });

        addForm.reset();
        addModalEl.hide();
    }
});
elParrotsList.addEventListener("click", function (evt) {
            if (evt.target.matches(".btn-danger")) {
                const clickedElement = evt.target.dataset.id;
                const findedIndex = products.findIndex((parrot) => {
                    return parrot.id == clickedElement;
                });

                products.splice(findedIndex, 1);
                elParrotsList.innerHTML = "";
                products.forEach((parrot) => {
                    RenderItem(parrot);
                });
            }
        else if (evt.target.matches(".btn-secondary")) {
            const clickedElement = Number(evt.target.dataset.id);
            const findedProduct = products.find(element => element.id === clickedElement);
            if (findedProduct) {
                editParrotTitle.value = findedProduct.title;
                editParrotImg.value = findedProduct.img;
                editParrotPrice.value = findedProduct.price;
                editParrotDate.value = findedProduct.birthDate;

                editParrotModalEl.hide()
            }
        }
    });