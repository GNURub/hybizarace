import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'hombre' | 'mujer';
  sizes: string[];
  colors: string[];
  images: string[];
  featured: boolean;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterLink],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  // Señales para el estado del componente
  selectedCategory = signal<'todos' | 'hombre' | 'mujer'>('todos');
  selectedProduct = signal<Product | null>(null);
  selectedSize = signal<string>('');
  selectedColor = signal<string>('');
  cart = signal<CartItem[]>([]);
  isModalOpen = signal(false);
  isImageModalOpen = signal(false);
  selectedImage = signal<string>('');

  // Exponer Math para usar en el template
  Math = Math;

  // Productos disponibles
  products: Product[] = [
    {
      id: 'camiseta-hombre',
      name: 'Camiseta Técnica Hybiza Race',
      description:
        'Camiseta técnica de alta calidad con tecnología dry-fit. Perfecta para entrenar y competir. Diseño exclusivo del evento con logos oficiales.',
      price: 12,
      originalPrice: 12,
      category: 'hombre',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Negro', 'Azul Cyan', 'Amarillo'],
      images: ['/productos/camiseta_hombre.png'],
      featured: true,
      inStock: true,
    },
    {
      id: 'top-mujer',
      name: 'Top Deportivo Hybiza Race',
      description:
        'Top deportivo de soporte medio con tecnología transpirable. Diseño elegante y cómodo para máximo rendimiento durante el entrenamiento.',
      price: 25,
      originalPrice: 25,
      category: 'mujer',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Rosa Cyan', 'Blanco'],
      images: ['/productos/mujer_top.jpg'],
      featured: true,
      inStock: true,
    },
  ];

  ngOnInit() {
    this.loadCartFromStorage();
  }

  // Métodos para filtrar productos
  get filteredProducts() {
    const category = this.selectedCategory();
    if (category === 'todos') {
      return this.products;
    }
    return this.products.filter((product) => product.category === category);
  }

  // Cambiar categoría seleccionada
  selectCategory(category: 'todos' | 'hombre' | 'mujer') {
    this.selectedCategory.set(category);
  }

  // Abrir modal de producto
  openProductModal(product: Product) {
    this.selectedProduct.set(product);
    this.selectedSize.set(product.sizes[0]);
    this.selectedColor.set(product.colors[0]);
    this.isModalOpen.set(true);
  }

  // Cerrar modal
  closeModal() {
    this.isModalOpen.set(false);
    this.selectedProduct.set(null);
    this.selectedSize.set('');
    this.selectedColor.set('');
  }

  // Abrir modal de imagen ampliada
  openImageModal(imageUrl: string) {
    this.selectedImage.set(imageUrl);
    this.isImageModalOpen.set(true);
  }

  // Cerrar modal de imagen
  closeImageModal() {
    this.isImageModalOpen.set(false);
    this.selectedImage.set('');
  }

  // Agregar al carrito
  addToCart(
    product: Product,
    size: string,
    color: string,
    quantity: number = 1,
  ) {
    const currentCart = this.cart();
    const existingItem = currentCart.find(
      (item) =>
        item.product.id === product.id &&
        item.size === size &&
        item.color === color,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({
        product,
        size,
        color,
        quantity,
      });
    }

    this.cart.set([...currentCart]);
    this.saveCartToStorage();
    this.showSuccessMessage('¡Producto agregado al carrito!');
    this.closeModal();
  }

  // Remover del carrito
  removeFromCart(index: number) {
    const currentCart = this.cart();
    currentCart.splice(index, 1);
    this.cart.set([...currentCart]);
    this.saveCartToStorage();
  }

  // Calcular total del carrito
  get cartTotal() {
    return this.cart().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  // Guardar carrito en localStorage
  private saveCartToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hybiza-cart', JSON.stringify(this.cart()));
    }
  }

  // Cargar carrito desde localStorage
  private loadCartFromStorage() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hybiza-cart');
      if (saved) {
        try {
          this.cart.set(JSON.parse(saved));
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    }
  }

  // Proceder al checkout
  proceedToCheckout() {
    if (this.cart().length === 0) {
      this.showErrorMessage('El carrito está vacío');
      return;
    }

    // Aquí se integraría con el sistema de pago
    this.showSuccessMessage('Funcionalidad de pago próximamente disponible');
  }

  // Mostrar mensajes
  private showSuccessMessage(message: string) {
    this.showMessage(message, 'success');
  }

  private showErrorMessage(message: string) {
    this.showMessage(message, 'error');
  }

  private showMessage(message: string, type: 'success' | 'error') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg font-semibold z-50 animate-float-up ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Tracking de eventos
  trackEvent(eventName: string, productId?: string) {
    console.log(`Shop Event: ${eventName}`, productId ? { productId } : {});

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'shop',
        event_label: productId || 'general',
      });
    }
  }
}
