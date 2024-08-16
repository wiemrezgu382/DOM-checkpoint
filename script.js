document.addEventListener('DOMContentLoaded', function () {
  const cartItems = document.querySelectorAll('.cart-item');
  const totalPriceElement = document.getElementById('total');

  // Fonction pour mettre à jour le prix total
  function updateTotal() {
      let total = 0;
      cartItems.forEach(item => {
          const quantity = parseInt(item.querySelector('.quantity').value);
          const price = parseFloat(item.getAttribute('data-price'));

          // S'assurer que la quantité est bien prise en compte
          if (quantity > 0) {
              total += quantity * price;
          }
      });
      totalPriceElement.innerText = total.toFixed(2);
  }

  // Écouteurs d'événements pour chaque article du panier
  cartItems.forEach(item => {
      const decreaseBtn = item.querySelector('.decrease');
      const increaseBtn = item.querySelector('.increase');
      const deleteBtn = item.querySelector('.delete');
      const likeBtn = item.querySelector('.like');
      const quantityInput = item.querySelector('.quantity');

      // Diminuer la quantité
      decreaseBtn.addEventListener('click', function () {
          let quantity = parseInt(quantityInput.value);
          if (quantity > 0) {
              quantityInput.value = quantity - 1;
              updateTotal();
          }
      });

      // Augmenter la quantité
      increaseBtn.addEventListener('click', function () {
          let quantity = parseInt(quantityInput.value);
          quantityInput.value = quantity + 1;
          updateTotal();
      });

      // Supprimer un article
      deleteBtn.addEventListener('click', function () {
          item.remove();
          updateTotal();
      });

      // Aimer un article (changement de couleur)
      likeBtn.addEventListener('click', function () {
          likeBtn.classList.toggle('liked');
          likeBtn.style.color = likeBtn.classList.contains('liked') ? 'red' : ''; 
      });

      // Mettre à jour le total lorsque la quantité change manuellement
      quantityInput.addEventListener('change', function () {
          if (quantityInput.value < 0) {
              quantityInput.value = 0;
          }
          updateTotal();
      });
  });

  // Calcul initial du total
  updateTotal();
});
