function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function ajouterImage() {
    var newImage = document.getElementById("newImage").value;
    var imageList = document.getElementById("imageList");
    var listItem = document.createElement("li");

    // Créer un élément img pour la prévisualisation de l'image
    var imagePreview = document.createElement("img");
    imagePreview.src = newImage;
    imagePreview.alt = "Image Preview";
    imagePreview.style.maxWidth = "50px"; // Ajuste la taille selon tes besoins

    // Ajouter un gestionnaire d'événements pour la suppression au clic sur l'image
    imagePreview.addEventListener("click", function () {
        imageList.removeChild(listItem);
    });

    // Ajouter l'élément img à l'élément li
    listItem.appendChild(imagePreview);

    // Ajouter le texte de l'image à l'élément li avec la troncature
    listItem.appendChild(document.createTextNode(truncateText(newImage, 30)));

    // Ajouter l'élément li à la liste
    imageList.appendChild(listItem);

    document.getElementById("newImage").value = "";
}

function ajouterVideo() {
    var newVideo = document.getElementById("newVideo").value;
    var videoList = document.getElementById("videoList");
    var listItem = document.createElement("li");

    // Créer un élément img pour la prévisualisation de la vidéo
    var videoPreview = document.createElement("img");
    videoPreview.src = "https://purepng.com/public/uploads/large/purepng.com-video-icon-galaxy-s6symbolsiconssamsungapp-iconsgalaxy-s6-icons-721522597480axbjz.png"; // Remplace avec l'URL de l'image de prévisualisation
    videoPreview.alt = "Video Preview";
    videoPreview.style.maxWidth = "50px"; // Ajuste la taille selon tes besoins

    // Ajouter un gestionnaire d'événements pour la suppression au clic sur l'image de prévisualisation
    videoPreview.addEventListener("click", function () {
        videoList.removeChild(listItem);
    });

    // Ajouter l'élément img de prévisualisation à l'élément li
    listItem.appendChild(videoPreview);

    // Ajouter le texte de la vidéo à l'élément li avec la troncature
    listItem.appendChild(document.createTextNode(truncateText(newVideo, 30)));

    // Ajouter l'élément li à la liste
    videoList.appendChild(listItem);

    document.getElementById("newVideo").value = "";
}




var projetsList = []; // Tableau pour stocker les objets JSON des projets



function validerFormulaire() {
    var imageList = document.getElementById("imageList").getElementsByTagName("li");
    var videoList = document.getElementById("videoList").getElementsByTagName("li");

    var imageUrls = [];
    var videoUrls = [];

    for (var i = 0; i < imageList.length; i++) {
        imageUrls.push(imageList[i].textContent);
    }

    for (var i = 0; i < videoList.length; i++) {
        videoUrls.push(videoList[i].textContent);
    }

    // Récupérer les autres valeurs du formulaire
    var projectNumber = document.getElementById("id").value;
    var version = document.getElementById("version").value;
    var projectName = document.getElementById("titre").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    var type = document.getElementById("type").value;
    var workplace = document.getElementById("workplace").value;

    // Construire l'objet JSON
    var projetJSON = {
        "projectNumber": parseInt(projectNumber),
        "version": parseInt(version),
        "projectName": projectName,
        "description": description,
        "imageUrls": imageUrls,
        "videoUrls": videoUrls,
        "date": date,
        "type": type,
        "workplace": workplace
    };

    // Ajouter l'objet JSON au tableau
    projetsList.push(projetJSON);

    // Afficher le tableau dans la console
    console.log("Liste des projets:", projetsList);

    // Mettre à jour la liste affichée sur la page
    afficherProjets();
}

function afficherProjets() {
    var projetsListe = document.getElementById("projetsListe");

    // Effacer le contenu actuel de la liste
    projetsListe.innerHTML = "";

    // Parcourir le tableau des projets et les ajouter à la liste sur la page
    projetsList.forEach(function (projet) {
        var listItem = document.createElement("li");
        listItem.textContent = JSON.stringify(projet, null, 2);
        projetsListe.appendChild(listItem);
    });
}



function telechargerJson() {
    // Convertir le tableau des projets en JSON
    var projetsJson = JSON.stringify(projetsList, null, 2);

    // Créer un objet Blob contenant le JSON
    var blob = new Blob([projetsJson], { type: "application/json" });

    // Créer un élément d'ancrage (a) pour le téléchargement
    var link = document.createElement("a");

    // Créer une URL objet pour le Blob
    var url = URL.createObjectURL(blob);

    // Définir les attributs de l'élément d'ancrage pour le téléchargement
    link.href = url;
    link.download = "projets.json";

    // Ajouter l'élément d'ancrage au document
    document.body.appendChild(link);

    // Simuler un clic sur l'élément d'ancrage pour déclencher le téléchargement
    link.click();

    // Supprimer l'élément d'ancrage du document
    document.body.removeChild(link);

    // Révoquer l'URL objet pour libérer les ressources
    URL.revokeObjectURL(url);
}
