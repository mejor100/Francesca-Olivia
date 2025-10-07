// =================================================================
// 🧠 CEREBRO DEL CHATBOT (LÓGICA PURA)
// =================================================================

const CONFIG = {
  EMAIL: 'esequielbelengimenez@gmail.com',
  MIN_SCORE: 2,
  SCORES: { NOMBRE: 5, CATEGORIA: 3, TAG: 2, TIPO: 2 },
  MAX_INTENTOS_FALLIDOS: 2
};

const ESTADOS = {
  ESPERANDO_CONFIRMACION: 'esperando_confirmacion',
  ESPERANDO_FRAGANCIA: 'esperando_fragancia',
  ESPERANDO_AMBIENTE: 'esperando_tipo_ayuda',
  ESPERANDO_FRAGANCIA_AMBIENTE: 'esperando_fragancia_ambiente',
  ESPERANDO_PRODUCTO: 'esperando_producto'
};

const EMOJIS = {
  frutal: '🍎', citrica: '🍊', floral: '🌸', gourmet: '🍰',
  spa: '🌿', infantil: '👶', mistica: '🕯️', clasica: '✨'
};

const PRODUCTOS = {
  perfuminas_textiles: { id: 'perfuminas_textiles', nombre: 'Perfuminas Textiles 2%', descripcion: 'Bidón 5lts', precio: 25500, categoria: 'textiles', tags: ['textil', 'ropa', 'tela', 'perfumar', 'cortina'], requiereFragancia: true },
  home_spray: { id: 'home_spray', nombre: 'Home Spray', descripcion: '250cc', precio: 3000, categoria: 'sprays', tags: ['spray', 'ambientador'], requiereFragancia: true },
  home_spray_gatillo: { id: 'home_spray_gatillo', nombre: 'Home Spray con Gatillo', descripcion: '250cc', precio: 3300, categoria: 'sprays', tags: ['spray', 'gatillo', 'ambientador'], requiereFragancia: true },
  difusores_clasicos: { id: 'difusores_clasicos', nombre: 'Difusores Clásicos', descripcion: '125cc con varillas', precio: 3400, categoria: 'difusores', tags: ['difusor', 'varillas', 'permanente'], requiereFragancia: true },
  repuesto_difusor_litro: { id: 'repuesto_difusor_litro', nombre: 'Repuesto Difusor 15%', descripcion: 'Por litro', precio: 16500, categoria: 'repuestos', tags: ['repuesto', 'recarga', 'difusor'], requiereFragancia: true },
  repuesto_difusor_5lts: { id: 'repuesto_difusor_5lts', nombre: 'Repuesto Difusor 15%', descripcion: '5lts', precio: 65500, categoria: 'repuestos', tags: ['repuesto', 'recarga', 'mayorista'], requiereFragancia: true },
  deo_desinfectante: { id: 'deo_desinfectante', nombre: 'Deo Desinfectante', descripcion: '125cc (rinde 5lts)', precio: 4500, categoria: 'limpieza', tags: ['desinfectante', 'limpieza', 'pisos'], requiereFragancia: false },
  jabon_ariel_litro: { id: 'jabon_ariel_litro', nombre: 'Jabón Líquido Ariel', descripcion: 'Por litro', precio: 3000, categoria: 'limpieza', tags: ['jabon', 'ropa', 'ariel'], requiereFragancia: false },
  jabon_liquido_5lts: { id: 'jabon_liquido_5lts', nombre: 'Jabón Líquido', descripcion: 'Bidón 5lts', precio: 11500, categoria: 'limpieza', tags: ['jabon', 'ropa', 'bidon'], requiereFragancia: false },
  suavizante_5lts: { id: 'suavizante_5lts', nombre: 'Suavizante Confort/Vivex', descripcion: 'Bidón 5lts', precio: 11500, categoria: 'limpieza', tags: ['suavizante', 'confort', 'vivex'], requiereFragancia: false },
  body_splash_125: { id: 'body_splash_125', nombre: 'Body Splash Imitación 8%', descripcion: '125cc', precio: 4700, categoria: 'personal', tags: ['splash', 'cuerpo', 'perfume'], requiereFragancia: true },
  body_splash_litro: { id: 'body_splash_litro', nombre: 'Body Splash Imitación 8%', descripcion: 'Por litro', precio: 15700, categoria: 'personal', tags: ['splash', 'litro', 'perfume'], requiereFragancia: true }
};

const FRAGANCIAS = {
  manzana: { id: 'manzana', nombre: 'Manzana', tipo: 'frutal' }, bubaloo: { id: 'bubaloo', nombre: 'Bubaloo', tipo: 'frutal' }, melon: { id: 'melon', nombre: 'Melón', tipo: 'frutal' }, pasion_frutal: { id: 'pasion_frutal', nombre: 'Pasión frutal', tipo: 'frutal' }, casino: { id: 'casino', nombre: 'Casino', tipo: 'frutal' }, papaya: { id: 'papaya', nombre: 'Papaya', tipo: 'frutal' }, sandia_pepino: { id: 'sandia_pepino', nombre: 'Sandía y pepino', tipo: 'frutal' }, frutos_bosque: { id: 'frutos_bosque', nombre: 'Frutos del bosque', tipo: 'frutal' }, frutilla: { id: 'frutilla', nombre: 'Frutilla', tipo: 'frutal' }, uva: { id: 'uva', nombre: 'Uva', tipo: 'frutal' }, manzana_verde: { id: 'manzana_verde', nombre: 'Manzana verde', tipo: 'frutal' }, frambuesa: { id: 'frambuesa', nombre: 'Frambuesa', tipo: 'frutal' }, durazno: { id: 'durazno', nombre: 'Durazno', tipo: 'frutal' }, cereza: { id: 'cereza', nombre: 'Cereza', tipo: 'frutal' }, kiwi: { id: 'kiwi', nombre: 'Kiwi', tipo: 'frutal' }, sandia: { id: 'sandia', nombre: 'Sandia', tipo: 'frutal' }, kosiuko: { id: 'kosiuko', nombre: 'Kosiuko', tipo: 'frutal' }, new_grape: { id: 'new_grape', nombre: 'New grape', tipo: 'frutal' }, anana: { id: 'anana', nombre: 'Ananá', tipo: 'frutal' }, banana: { id: 'banana', nombre: 'Banana', tipo: 'frutal' }, mix_berry: { id: 'mix_berry', nombre: 'Mix berry', tipo: 'frutal' }, maracuya: { id: 'maracuya', nombre: 'Maracuyá', tipo: 'frutal' }, pepino_melon: { id: 'pepino_melon', nombre: 'Pepino y melón', tipo: 'frutal' }, fresas: { id: 'fresas', nombre: 'Fresas', tipo: 'frutal' }, ciruelas: { id: 'ciruelas', nombre: 'Ciruelas', tipo: 'frutal' }, chicle: { id: 'chicle', nombre: 'Chicle', tipo: 'frutal' }, frutos_rojos: { id: 'frutos_rojos', nombre: 'Frutos rojos', tipo: 'frutal' }, mora: { id: 'mora', nombre: 'Mora', tipo: 'frutal' }, cherry: { id: 'cherry', nombre: 'Cherry', tipo: 'frutal' }, mango: { id: 'mango', nombre: 'Mango', tipo: 'frutal' }, citrus: { id: 'citrus', nombre: 'Citrus', tipo: 'citrica', recomendado: true }, verbena: { id: 'verbena', nombre: 'Verbena', tipo: 'citrica', recomendado: true }, lemongrass: { id: 'lemongrass', nombre: 'Lemongrass', tipo: 'citrica', recomendado: true }, te_verde_mandarina: { id: 'te_verde_mandarina', nombre: 'Té verde y mandarina', tipo: 'citrica' }, limon_verde: { id: 'limon_verde', nombre: 'Limón verde', tipo: 'citrica' }, te_verde_limon: { id: 'te_verde_limon', nombre: 'Té verde y limón', tipo: 'citrica' }, pomelo: { id: 'pomelo', nombre: 'Pomelo', tipo: 'citrica' }, limon: { id: 'limon', nombre: 'Limón', tipo: 'citrica' }, bergamota: { id: 'bergamota', nombre: 'Bergamota', tipo: 'citrica' }, orange: { id: 'orange', nombre: 'Orange', tipo: 'citrica' }, mandarina: { id: 'mandarina', nombre: 'Mandarina', tipo: 'citrica' }, naranja: { id: 'naranja', nombre: 'Naranja', tipo: 'citrica' }, naranja_mandarina: { id: 'naranja_mandarina', nombre: 'Naranja-mandarina', tipo: 'citrica' }, caramelo_limon: { id: 'caramelo_limon', nombre: 'Caramelo de limón', tipo: 'citrica' }, naranja_maracuya: { id: 'naranja_maracuya', nombre: 'Naranja y maracuyá', tipo: 'citrica' }, limon_especiado: { id: 'limon_especiado', nombre: 'Limón especiado', tipo: 'citrica' }, jazmin: { id: 'jazmin', nombre: 'Jazmín', tipo: 'floral', recomendado: true }, flores_blancas: { id: 'flores_blancas', nombre: 'Flores blancas', tipo: 'floral', recomendado: true }, puma: { id: 'puma', nombre: 'Puma', tipo: 'floral', recomendado: true }, nardo: { id: 'nardo', nombre: 'Nardo', tipo: 'floral', recomendado: true }, armonia: { id: 'armonia', nombre: 'Armonía', tipo: 'floral' }, mil_flores: { id: 'mil_flores', nombre: 'Mil flores', tipo: 'floral' }, flores_primavera: { id: 'flores_primavera', nombre: 'Flores de primavera', tipo: 'floral' }, rosa: { id: 'rosa', nombre: 'Rosa', tipo: 'floral' }, gardenia: { id: 'gardenia', nombre: 'Gardenia', tipo: 'floral' }, reina_noche: { id: 'reina_noche', nombre: 'Reina de la noche', tipo: 'floral' }, lavanda: { id: 'lavanda', nombre: 'Lavanda', tipo: 'floral' }, fresias: { id: 'fresias', nombre: 'Fresias', tipo: 'floral' }, floral: { id: 'floral', nombre: 'Floral', tipo: 'floral' }, tilo: { id: 'tilo', nombre: 'Tilo', tipo: 'floral' }, te_verde: { id: 'te_verde', nombre: 'Té verde', tipo: 'floral' }, loto: { id: 'loto', nombre: 'Loto', tipo: 'floral' }, manzanilla: { id: 'manzanilla', nombre: 'Manzanilla', tipo: 'floral' }, violeta: { id: 'violeta', nombre: 'Violeta', tipo: 'floral' }, azahar: { id: 'azahar', nombre: 'Azahar', tipo: 'floral' }, orquidea: { id: 'orquidea', nombre: 'Orquídea', tipo: 'floral' }, armonia_dulce: { id: 'armonia_dulce', nombre: 'Armonía dulce', tipo: 'floral' }, coco_rallado: { id: 'coco_rallado', nombre: 'Coco rallado', tipo: 'gourmet' }, chocolate_avellanas: { id: 'chocolate_avellanas', nombre: 'Chocolate y avellanas', tipo: 'gourmet' }, almendras: { id: 'almendras', nombre: 'Almendras', tipo: 'gourmet' }, vainilla_silk: { id: 'vainilla_silk', nombre: 'Vainilla silk', tipo: 'gourmet' }, vainilla: { id: 'vainilla', nombre: 'Vainilla', tipo: 'gourmet' }, chocolate_blanco: { id: 'chocolate_blanco', nombre: 'Chocolate blanco', tipo: 'gourmet' }, chocolate_blanco_coco: { id: 'chocolate_blanco_coco', nombre: 'Chocolate blanco y coco', tipo: 'gourmet' }, vainilla_canela: { id: 'vainilla_canela', nombre: 'Vainilla y canela', tipo: 'gourmet' }, rocio_miel: { id: 'rocio_miel', nombre: 'Rocío de miel', tipo: 'gourmet' }, chocolate: { id: 'chocolate', nombre: 'Chocolate', tipo: 'gourmet' }, miel: { id: 'miel', nombre: 'Miel', tipo: 'gourmet' }, cookies_choc: { id: 'cookies_choc', nombre: 'Cookies choc', tipo: 'gourmet' }, coco: { id: 'coco', nombre: 'Coco', tipo: 'gourmet' }, canela: { id: 'canela', nombre: 'Canela', tipo: 'gourmet' }, capuchino: { id: 'capuchino', nombre: 'Capuchino', tipo: 'gourmet' }, vainilla_chocolate: { id: 'vainilla_chocolate', nombre: 'Vainilla y chocolate', tipo: 'gourmet' }, cola: { id: 'cola', nombre: 'Cola', tipo: 'gourmet' }, coco_dulce: { id: 'coco_dulce', nombre: 'Coco dulce', tipo: 'gourmet' }, cafe: { id: 'cafe', nombre: 'Café', tipo: 'gourmet' }, marshmallow: { id: 'marshmallow', nombre: 'Marshmallow', tipo: 'gourmet' }, menta_eucaliptos: { id: 'menta_eucaliptos', nombre: 'Menta eucaliptos', tipo: 'spa' }, bamboo: { id: 'bamboo', nombre: 'Bamboo', tipo: 'spa' }, te_verde_bergamota: { id: 'te_verde_bergamota', nombre: 'Té verde y bergamota', tipo: 'spa' }, eucaliptos: { id: 'eucaliptos', nombre: 'Eucaliptos', tipo: 'spa' }, romero: { id: 'romero', nombre: 'Romero', tipo: 'spa' }, ylang: { id: 'ylang', nombre: 'Ylang', tipo: 'spa' }, spa_frutas_romero: { id: 'spa_frutas_romero', nombre: 'Spa frutas con romero', tipo: 'spa' }, heno: { id: 'heno', nombre: 'Heno', tipo: 'spa' }, benjui: { id: 'benjui', nombre: 'Benjuí', tipo: 'spa' }, limon_bamboo: { id: 'limon_bamboo', nombre: 'Limón y bamboo', tipo: 'spa' }, lavanda_manzanilla_limon: { id: 'lavanda_manzanilla_limon', nombre: 'Lavanda, manzanilla y limón', tipo: 'spa' }, pimienta: { id: 'pimienta', nombre: 'Pimienta', tipo: 'spa' }, jengibre: { id: 'jengibre', nombre: 'Jengibre', tipo: 'spa' }, te_verde_pepino: { id: 'te_verde_pepino', nombre: 'Té verde y pepino', tipo: 'spa' }, fos_baby: { id: 'fos_baby', nombre: 'Fòs baby', tipo: 'infantil', recomendado: true }, cheeky: { id: 'cheeky', nombre: 'Cheeky', tipo: 'infantil', recomendado: true }, baby_j: { id: 'baby_j', nombre: 'Baby J', tipo: 'infantil', recomendado: true }, mama_bebe: { id: 'mama_bebe', nombre: 'Mamá bebé', tipo: 'infantil' }, baby_daniels: { id: 'baby_daniels', nombre: 'Baby Danields', tipo: 'infantil' }, critic_baby: { id: 'critic_baby', nombre: 'Critic baby', tipo: 'infantil' }, blue: { id: 'blue', nombre: 'Blue', tipo: 'infantil' }, baby_blue: { id: 'baby_blue', nombre: 'Baby blue', tipo: 'infantil' }, mate_baby: { id: 'mate_baby', nombre: 'Mate baby', tipo: 'infantil' }, sai_ba: { id: 'sai_ba', nombre: 'Sai-Ba (Nag champa)', tipo: 'mistica' }, vainilla_sandalo: { id: 'vainilla_sandalo', nombre: 'Vainilla y sándalo', tipo: 'mistica' }, maderas: { id: 'maderas', nombre: 'Maderas', tipo: 'mistica' }, incienso: { id: 'incienso', nombre: 'Incienso', tipo: 'mistica' }, oriental: { id: 'oriental', nombre: 'Oriental', tipo: 'mistica' }, almizcle: { id: 'almizcle', nombre: 'Almizcle', tipo: 'mistica' }, neroli: { id: 'neroli', nombre: 'Neroli', tipo: 'mistica' }, cedro: { id: 'cedro', nombre: 'Cedro', tipo: 'mistica' }, mirra: { id: 'mirra', nombre: 'Mirra', tipo: 'mistica' }, madera_sandalo: { id: 'madera_sandalo', nombre: 'Madera y sándalo', tipo: 'mistica' }, patchouli: { id: 'patchouli', nombre: 'Patchouli', tipo: 'mistica' }, madera_patchouli: { id: 'madera_patchouli', nombre: 'Madera y patchouli', tipo: 'mistica' }, sandalo: { id: 'sandalo', nombre: 'Sándalo', tipo: 'mistica' }, pino: { id: 'pino', nombre: 'Pino', tipo: 'mistica' }, coni: { id: 'coni', nombre: 'Coni', tipo: 'clasica' }, fragancia_21: { id: 'fragancia_21', nombre: 'Fragancia 21', tipo: 'clasica' }, vivex: { id: 'vivex', nombre: 'Vivex', tipo: 'clasica' }, confort: { id: 'confort', nombre: 'Confort', tipo: 'clasica' }, suavidad_algodon: { id: 'suavidad_algodon', nombre: 'Suavidad de algodón', tipo: 'clasica' }, crombie: { id: 'crombie', nombre: 'Crombie', tipo: 'clasica' }, dom: { id: 'dom', nombre: 'Dom', tipo: 'clasica' }, drakar: { id: 'drakar', nombre: 'Drakar', tipo: 'clasica' }, paris: { id: 'paris', nombre: 'Paris', tipo: 'clasica' }, cotton: { id: 'cotton', nombre: 'Cotton', tipo: 'clasica' }, clean_house: { id: 'clean_house', nombre: 'Clean house', tipo: 'clasica' }, marina: { id: 'marina', nombre: 'Marina', tipo: 'clasica' }, lisoform: { id: 'lisoform', nombre: 'Lisoform', tipo: 'clasica' }
};

class Normalizador { 
  cache = new Map(); 
  
  normalizar(texto) { 
    if (!texto) return ''; 
    if (this.cache.has(texto)) return this.cache.get(texto); 
    
    const norm = texto
      .toLowerCase()
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .replace(/[\u{2600}-\u{26FF}]/gu, '')
      .replace(/[\u{2700}-\u{27BF}]/gu, '')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    
    this.cache.set(texto, norm); 
    return norm; 
  } 
}

class Buscador { 
  constructor(items, tipo) { 
    this.items = items; 
    this.tipo = tipo; 
    this.norm = new Normalizador(); 
  } 
  
  buscar(texto) { 
    const textoNorm = this.norm.normalizar(texto); 
    const scores = new Map(); 
    
    Object.values(this.items).forEach(item => { 
      let score = 0; 
      const nombreNorm = this.norm.normalizar(item.nombre); 
      
      if (textoNorm === nombreNorm) score += CONFIG.SCORES.NOMBRE * 2;
      else if (textoNorm.includes(nombreNorm)) score += CONFIG.SCORES.NOMBRE; 
      else if (nombreNorm.includes(textoNorm)) score += CONFIG.SCORES.NOMBRE - 1; 
      
      if (this.tipo === 'producto') { 
        if (textoNorm.includes(item.categoria)) score += CONFIG.SCORES.CATEGORIA; 
        item.tags?.forEach(tag => { 
          if (textoNorm.includes(tag) || tag.includes(textoNorm)) score += CONFIG.SCORES.TAG; 
        }); 
      } else { 
        if (textoNorm.includes(item.tipo) || item.tipo.includes(textoNorm)) score += CONFIG.SCORES.TIPO; 
      } 
      
      if (score > 0) scores.set(item, score); 
    }); 
    
    return [...scores.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || null; 
  } 
}

class Carrito { 
  constructor(data) { 
    this.items = data?.items || []; 
    this.total = data?.total || 0; 
  } 
  
  agregar(productoId, fraganciaId, cantidad = 1) { 
    const idx = this.items.findIndex(i => i.productoId === productoId && i.fraganciaId === fraganciaId); 
    if (idx >= 0) { 
      this.items[idx].cantidad += cantidad; 
    } else { 
      this.items.push({ productoId, fraganciaId, cantidad, precioUnitario: PRODUCTOS[productoId].precio }); 
    } 
    this.#recalcular(); 
  } 
  
  eliminar(index) { 
    this.items.splice(index, 1); 
    this.#recalcular(); 
  } 
  
  vaciar() { 
    this.items = []; 
    this.total = 0; 
  } 
  
  #recalcular() { 
    this.total = this.items.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0); 
  } 
  
  get vacio() { 
    return this.items.length === 0; 
  } 
  
  obtenerResumen() { 
    if (this.vacio) return '🛒 Tu carrito está vacío.'; 
    
    const lineas = this.items.map((item, i) => { 
      const p = PRODUCTOS[item.productoId]; 
      const f = item.fraganciaId ? FRAGANCIAS[item.fraganciaId] : null; 
      const subtotal = p.precio * item.cantidad; 
      return `${i + 1}. ${item.cantidad}x ${p.nombre}${f ? ` - ${f.nombre}` : ''}\n   $${p.precio.toLocaleString()} c/u = $${subtotal.toLocaleString()}`; 
    }); 
    
    return `🛒 **TU PEDIDO:**\n\n${lineas.join('\n\n')}\n\n💵 **TOTAL: $${this.total.toLocaleString()}**`; 
  } 
  
  // ✅ CAMBIO CRÍTICO: Ya NO retorna mailto:, solo los datos del pedido
  obtenerDatosPedido() { 
    const lineas = this.items.map((item, i) => { 
      const p = PRODUCTOS[item.productoId]; 
      const f = item.fraganciaId ? FRAGANCIAS[item.fraganciaId] : null; 
      return `${i + 1}. ${item.cantidad}x ${p.nombre}${f ? ` - ${f.nombre}` : ''}\n   $${p.precio.toLocaleString()} c/u = $${(p.precio * item.cantidad).toLocaleString()}`; 
    }); 
    
    return {
      lineas: lineas,
      total: this.total
    };
  } 
  
  toJSON() { 
    return { items: this.items, total: this.total }; 
  } 
}

class DetectorIntencion {
  static limpiarMensaje(mensaje) {
    return mensaje
      .toLowerCase()
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .replace(/[\u{2600}-\u{26FF}]/gu, '')
      .replace(/[\u{2700}-\u{27BF}]/gu, '')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }
  
  static detectar(mensaje) {
    const msg = this.limpiarMensaje(mensaje);
    if (/^(cancelar|salir|volver|menu|inicio|reiniciar)/.test(msg)) return 'cancelar';
    if (/(ver|mostrar).*(carrito|pedido)|mi (carrito|pedido)|que (agregue|tengo|pedi)/.test(msg)) return 'ver_carrito';
    if (/(finalizar|terminar|enviar|confirmar).*(pedido|compra)|^enviar pedido/.test(msg)) return 'finalizar_pedido';
    if (/(vaciar|limpiar).*(carrito|todo)/.test(msg)) return 'vaciar_carrito';
    if (/(eliminar|borrar|quitar|sacar)/.test(msg)) return 'eliminar_item';
    if (/^(si|si|dale|ok|okay|bueno|agregalo|confirmo|perfecto|eso|sep|sepi)$/.test(msg)) return 'confirmacion';
    if (/^(no|nop|nope|paso|otra|cambiar)$/.test(msg)) return 'negacion';
    if (/^(ver|mostrar|lista|listar) productos?$/.test(msg) || msg === 'productos' || msg === 'catalogo') return 'ver_productos';
    if (/^(ver|mostrar|lista|listar) fragancias?$/.test(msg) || msg === 'fragancias' || msg === 'aromas') return 'ver_fragancias';
    if (/(ayuda|ayudar|ayudame|elegir|recomendar|sugerir|aconsejar|no se cual|que conviene)/.test(msg)) return 'pedir_ayuda';
    if (/^(seguir comprando|agregar mas|ver mas|otra cosa|que mas|algo mas)$/.test(msg)) return 'seguir_comprando';
    if (/(precio|cuanto|vale|cuesta)/.test(msg)) return 'consulta_precio';
    if (/^(hola|buenas|buen dia|hey|hi|ey)/.test(msg)) return 'saludo';
    if (/(quiero|necesito|busco|dame|me das|agregame|poneme).+(producto|difusor|spray|repuesto|jabon)/.test(msg)) return 'agregar_producto';
    const mencionaProducto = Object.values(PRODUCTOS).some(p => msg.includes(p.nombre.toLowerCase()) || p.tags?.some(tag => msg.includes(tag)));
    const mencionaFragancia = Object.values(FRAGANCIAS).some(f => msg.includes(f.nombre.toLowerCase()));
    if (mencionaProducto || mencionaFragancia) return 'agregar_producto';
    return 'no_entendido';
  }
}

const Respuestas = {
  saludo: () => ({ 
    respuesta: '¡Hola! 👋 Soy el asistente de Francesca Olivia.\n\n¿En qué puedo ayudarte hoy?', 
    quick_replies: ['Ver productos', 'Ver fragancias', 'Ayudame a elegir'] 
  }),
  verProductos: () => { 
    const porCategoria = Object.values(PRODUCTOS).reduce((acc, p) => { (acc[p.categoria] = acc[p.categoria] || []).push(p); return acc; }, {}); 
    const texto = Object.entries(porCategoria).map(([cat, prods]) => `**${cat.toUpperCase()}:**\n${prods.map(p => `• ${p.nombre} - ${p.descripcion} - $${p.precio.toLocaleString()}`).join('\n')}`).join('\n\n'); 
    return { respuesta: `📦 **PRODUCTOS DISPONIBLES:**\n\n${texto}\n\n💡 Escribí el nombre del producto que te interesa.`, quick_replies: ['Ver fragancias', 'Ayudame a elegir', 'Ver mi carrito'] }; 
  },
  verFragancias: () => { 
    const porTipo = Object.values(FRAGANCIAS).reduce((acc, f) => { (acc[f.tipo] = acc[f.tipo] || []).push(f); return acc; }, {}); 
    const texto = Object.entries(porTipo).map(([tipo, frags]) => { 
      const emoji = EMOJIS[tipo] || '•'; 
      const recomendadas = frags.filter(f => f.recomendado); 
      const otras = frags.filter(f => !f.recomendado).slice(0, 5); 
      let lineas = recomendadas.map(f => `• ${f.nombre} ⭐`); 
      lineas.push(...otras.map(f => `• ${f.nombre}`)); 
      if (frags.length - recomendadas.length > 5) { lineas.push(`  ... y ${frags.length - recomendadas.length - 5} más`); } 
      return `\n**${emoji} ${tipo.toUpperCase()}** (${frags.length}):\n${lineas.join('\n')}`; 
    }).join('\n'); 
    return { respuesta: `🌸 **FRAGANCIAS DISPONIBLES:**${texto}\n\n⭐ = Más elegidas\n\n💡 Primero elegí un producto.`, quick_replies: ['Ver productos', 'Ayudame a elegir', 'Ver mi carrito'] }; 
  },
  ayudaAmbiente: {
    dormitorio: () => ({ respuesta: '🌙 **Para dormitorio te recomiendo:**\n\n• Difusor de Lavanda (relajante)\n• Difusor de Vainilla (cálido)\n\nAmbos ayudan a crear un ambiente de descanso.', quick_replies: ['Difusor Lavanda', 'Difusor Vainilla', 'Otro ambiente'] }),
    bano: () => ({ respuesta: '🚿 **Para baño te recomiendo:**\n\n• Home Spray Gatillo Verbena (fresco)\n• Home Spray Citrus (energizante)\n\nEl gatillo es ideal para neutralizar olores.', quick_replies: ['Spray Verbena', 'Spray Citrus', 'Otro ambiente'] }),
    living: () => ({ respuesta: '🏠 **Para living/comedor:**\n\n• Difusor de Vainilla (acogedor)\n• Difusor Flores Blancas (elegante)\n\nPerfectos para el espacio principal.', quick_replies: ['Difusor Vainilla', 'Difusor Flores Blancas', 'Otro ambiente'] }),
    cocina: () => ({ respuesta: '🍳 **Para cocina:**\n\n• Home Spray Verbena (limpio)\n• Home Spray Citrus (fresco)\n\nIdeales para neutralizar olores.', quick_replies: ['Spray Verbena', 'Spray Citrus', 'Otro ambiente'] }),
    bebe: () => ({ respuesta: '👶 **Para habitación de bebé:**\n\n• Difusor Fòs baby ⭐\n• Difusor Cheeky ⭐\n• Difusor Baby J ⭐\n\nAromas suaves y delicados.', quick_replies: ['Difusor Fos baby', 'Difusor Cheeky', 'Difusor Baby J'] }),
    default: () => ({ respuesta: '🏠 ¿Para qué ambiente lo necesitás?', quick_replies: ['Dormitorio', 'Baño', 'Living', 'Cocina', 'Para bebe'] })
  }
};

class ChatBot {
  constructor(mensaje, contexto = {}) {
    this.mensaje = mensaje;
    this.contexto = { 
      sessionId: contexto.sessionId || `session_${Date.now()}`, 
      carrito: new Carrito(contexto.carrito), 
      estado: contexto.estado, 
      producto_pendiente: contexto.producto_pendiente, 
      producto_seleccionado: contexto.producto_seleccionado,
      fragancia_seleccionada: contexto.fragancia_seleccionada,
      intentos_fallidos: contexto.intentos_fallidos || 0
    };
    this.buscadorProd = new Buscador(PRODUCTOS, 'producto');
    this.buscadorFrag = new Buscador(FRAGANCIAS, 'fragancia');
    this.norm = new Normalizador();
  }
  
  procesar() {
    const intencion = DetectorIntencion.detectar(this.mensaje);
    const comandosGlobales = ['cancelar', 'ver_carrito', 'vaciar_carrito', 'finalizar_pedido', 'saludo', 'ver_productos', 'ver_fragancias'];
    if (comandosGlobales.includes(intencion)) { this._resetearEstado(); return this._procesarIntencion(intencion); }
    if (this.contexto.estado) { return this[`_estado_${this.contexto.estado}`]?.() || this._procesarIntencion(intencion); }
    return this._procesarIntencion(intencion);
  }
  
  _resetearEstado() {
    delete this.contexto.estado;
    delete this.contexto.producto_pendiente;
    delete this.contexto.producto_seleccionado;
    this.contexto.intentos_fallidos = 0;
  }
  
  _incrementarIntentos() {
    this.contexto.intentos_fallidos = (this.contexto.intentos_fallidos || 0) + 1;
    if (this.contexto.intentos_fallidos >= CONFIG.MAX_INTENTOS_FALLIDOS) {
      this._resetearEstado();
      return { respuesta: '🤔 Parece que hay confusión. Empecemos de nuevo.\n\n¿Qué querés hacer?', quick_replies: ['Ver productos', 'Ver fragancias', 'Ayudame a elegir'] };
    }
    return null;
  }
  
  _estado_esperando_confirmacion() {
    const intencion = DetectorIntencion.detectar(this.mensaje);
    if (intencion === 'confirmacion') { 
      const { productoId, fraganciaId, cantidad } = this.contexto.producto_pendiente; 
      this.contexto.carrito.agregar(productoId, fraganciaId, cantidad); 
      const p = PRODUCTOS[productoId]; 
      const f = fraganciaId ? FRAGANCIAS[fraganciaId] : null; 
      this._resetearEstado();
      return { respuesta: `✅ **¡Agregado!**\n\n${cantidad}x ${p.nombre}${f ? ` - ${f.nombre}` : ''}\n💰 $${(p.precio * cantidad).toLocaleString()}`, quick_replies: ['Ver mi carrito', 'Seguir comprando', 'Finalizar pedido'] }; 
    }
    if (intencion === 'negacion') { 
      this._resetearEstado();
      return { respuesta: '👌 Cancelado. ¿Qué te gustaría hacer?', quick_replies: ['Ver productos', 'Ver fragancias', 'Ayudame a elegir'] }; 
    }
    const errorRespuesta = this._incrementarIntentos();
    if (errorRespuesta) return errorRespuesta;
    return { respuesta: '¿Agregamos el producto al carrito? Respondé "Si" o "No".', quick_replies: ['Si', 'No'] };
  }
  
  _estado_esperando_fragancia() {
    const intencion = DetectorIntencion.detectar(this.mensaje);
    if (intencion === 'negacion' || intencion === 'cancelar') { 
      this._resetearEstado();
      return { respuesta: '👌 Cancelado. ¿Qué querés hacer?', quick_replies: ['Ver productos', 'Ayudame a elegir'] }; 
    }
    const fragancia = this.buscadorFrag.buscar(this.mensaje);
    if (fragancia) { 
      const p = PRODUCTOS[this.contexto.producto_seleccionado]; 
      this.contexto.estado = ESTADOS.ESPERANDO_CONFIRMACION; 
      this.contexto.producto_pendiente = { productoId: this.contexto.producto_seleccionado, fraganciaId: fragancia.id, cantidad: 1 }; 
      this.contexto.intentos_fallidos = 0;
      return { respuesta: `✨ **${p.nombre} - ${fragancia.nombre}**\n\n📦 ${p.descripcion}\n💰 $${p.precio.toLocaleString()}\n\n¿Lo agregamos al carrito?`, quick_replies: ['Si', 'No'] }; 
    }
    const errorRespuesta = this._incrementarIntentos();
    if (errorRespuesta) return errorRespuesta;
    return { respuesta: '🤔 No encontré esa fragancia. Escribí el nombre (ej: "Lavanda").', quick_replies: ['Ver fragancias', 'Cancelar'] };
  }
  
  _estado_esperando_tipo_ayuda() { 
    const msg = this.norm.normalizar(this.mensaje);
    const ambientes = { dormitorio: /dormitorio|cuarto|habitacion|dormir/, bano: /bano|toilet/, living: /living|sala|comedor/, cocina: /cocina/, bebe: /bebe|baby|infantil|chico|nino/ }; 
    for (const [tipo, patron] of Object.entries(ambientes)) { 
      if (patron.test(msg)) { 
        this.contexto.estado = ESTADOS.ESPERANDO_FRAGANCIA_AMBIENTE; 
        this.contexto.intentos_fallidos = 0;
        return Respuestas.ayudaAmbiente[tipo](); 
      } 
    } 
    const errorRespuesta = this._incrementarIntentos();
    if (errorRespuesta) return errorRespuesta;
    return Respuestas.ayudaAmbiente.default(); 
  }
  
  _estado_esperando_fragancia_ambiente() { 
    const msg = this.norm.normalizar(this.mensaje);
    if (/otro ambiente|cambiar ambiente|otro/.test(msg)) {
      this.contexto.estado = ESTADOS.ESPERANDO_AMBIENTE;
      this.contexto.intentos_fallidos = 0;
      return Respuestas.ayudaAmbiente.default();
    }
    const fragancia = this.buscadorFrag.buscar(this.mensaje); 
    const producto = this.buscadorProd.buscar(this.mensaje) || PRODUCTOS.difusores_clasicos; 
    if (fragancia) { 
      this.contexto.estado = ESTADOS.ESPERANDO_CONFIRMACION; 
      this.contexto.producto_pendiente = { productoId: producto.id, fraganciaId: fragancia.id, cantidad: 1 }; 
      this.contexto.intentos_fallidos = 0;
      return { respuesta: `✨ **${producto.nombre} - ${fragancia.nombre}**\n\n💰 $${producto.precio.toLocaleString()}\n📦 ${producto.descripcion}\n\n¿Lo agregamos?`, quick_replies: ['Si', 'No'] }; 
    } 
    const errorRespuesta = this._incrementarIntentos();
    if (errorRespuesta) return errorRespuesta;
    return { respuesta: 'Elegí una de las fragancias recomendadas.', quick_replies: ['Ver fragancias', 'Otro ambiente', 'Cancelar'] }; 
  }
  
  _estado_esperando_producto() {
    const producto = this.buscadorProd.buscar(this.mensaje);
    
    if (producto) {
        const fraganciaId = this.contexto.fragancia_seleccionada;
        const fragancia = FRAGANCIAS[fraganciaId];
        
        if (producto.requiereFragancia) {
            this.contexto.estado = ESTADOS.ESPERANDO_CONFIRMACION;
            this.contexto.producto_pendiente = {
                productoId: producto.id,
                fraganciaId: fraganciaId,
                cantidad: 1
            };
            this.contexto.intentos_fallidos = 0;
            return {
                respuesta: `✨ **${producto.nombre} - ${fragancia.nombre}**\n\n💰 $${producto.precio.toLocaleString()}\n\n¿Lo agregamos al carrito?`,
                quick_replies: ['Si', 'No']
            };
        } else {
            this._resetearEstado();
            return {
                respuesta: `Lo siento, el producto **${producto.nombre}** no viene en fragancias. ¿Querés agregarlo igualmente?`,
                quick_replies: [`Agregar ${producto.nombre}`, 'Ver otros productos']
            };
        }
    }

    const errorRespuesta = this._incrementarIntentos();
    if (errorRespuesta) return errorRespuesta;

    return {
        respuesta: '🤔 No encontré ese producto. ¿En cuál querés la fragancia?',
        quick_replies: ['Difusor', 'Home Spray', 'Perfuminas', 'Cancelar']
    };
  }

  _procesarIntencion(intencion) {
    const handlers = {
      cancelar: () => this._cancelar(),
      saludo: () => Respuestas.saludo(),
      ver_productos: () => Respuestas.verProductos(),
      ver_fragancias: () => Respuestas.verFragancias(),
      ver_carrito: () => this._verCarrito(),
      pedir_ayuda: () => this._pedirAyuda(),
      seguir_comprando: () => this._seguirComprando(),
      agregar_producto: () => this._agregarProducto(),
      consulta_precio: () => this._consultaPrecio(),
      eliminar_item: () => this._eliminarItem(),
      vaciar_carrito: () => this._vaciarCarrito(),
      finalizar_pedido: () => this._finalizarPedido(),
      confirmacion: () => ({ respuesta: '🤔 No hay nada pendiente.\n\n¿Qué querés hacer?', quick_replies: ['Ver productos', 'Ver mi carrito'] }),
      negacion: () => ({ respuesta: '👌 ¿En qué puedo ayudarte?', quick_replies: ['Ver productos', 'Ver fragancias'] }),
      no_entendido: () => this._noEntendido()
    };
    return handlers[intencion]?.() || handlers.no_entendido();
  }
  
  _cancelar() { this._resetearEstado(); return { respuesta: '🔄 Volvamos al inicio. ¿Qué querés hacer?', quick_replies: ['Ver productos', 'Ver fragancias', 'Ayudame a elegir'] }; }
  _verCarrito() { 
    if (this.contexto.carrito.vacio) return { respuesta: this.contexto.carrito.obtenerResumen(), quick_replies: ['Ver productos', 'Ayudame a elegir'] };
    const cantidadItems = this.contexto.carrito.items.length;
    return { respuesta: this.contexto.carrito.obtenerResumen(), quick_replies: cantidadItems === 1 ? ['Finalizar pedido', 'Eliminar item', 'Seguir comprando', 'Vaciar carrito'] : ['Finalizar pedido', 'Eliminar items', 'Seguir comprando', 'Vaciar carrito'] }; 
  }
  _pedirAyuda() { this.contexto.estado = ESTADOS.ESPERANDO_AMBIENTE; this.contexto.intentos_fallidos = 0; return { respuesta: '🎯 ¿Para qué ambiente lo necesitás?', quick_replies: ['Dormitorio', 'Baño', 'Living', 'Cocina', 'Para bebe'] }; }
  _seguirComprando() { this._resetearEstado(); return { respuesta: '¿Qué más te gustaría?', quick_replies: ['Ver productos', 'Ver fragancias', 'Ayudame a elegir'] }; }
  
  _agregarProducto() { 
    const producto = this.buscadorProd.buscar(this.mensaje); 
    const fragancia = this.buscadorFrag.buscar(this.mensaje); 
    
    if (producto) { 
        if (producto.requiereFragancia) {
            if (fragancia) { 
                this.contexto.estado = ESTADOS.ESPERANDO_CONFIRMACION; 
                this.contexto.producto_pendiente = { productoId: producto.id, fraganciaId: fragancia.id, cantidad: 1 }; 
                this.contexto.intentos_fallidos = 0;
                return { respuesta: `📦 **${producto.nombre}**\n🌸 **${fragancia.nombre}**\n\n💰 $${producto.precio.toLocaleString()}\n\n¿Lo agregamos?`, quick_replies: ['Si', 'No'] }; 
            }
            this.contexto.estado = ESTADOS.ESPERANDO_FRAGANCIA; 
            this.contexto.producto_seleccionado = producto.id; 
            this.contexto.intentos_fallidos = 0;
            return { respuesta: `📦 **${producto.nombre}**\n💰 $${producto.precio.toLocaleString()}\n\n¿En qué fragancia lo querés?`, quick_replies: ['Lavanda', 'Verbena', 'Vainilla', 'Ver fragancias'] }; 
        }
        this.contexto.estado = ESTADOS.ESPERANDO_CONFIRMACION; 
        this.contexto.producto_pendiente = { productoId: producto.id, fraganciaId: null, cantidad: 1 }; 
        this.contexto.intentos_fallidos = 0;
        return { respuesta: `📦 **${producto.nombre}**\n💰 $${producto.precio.toLocaleString()}\n\n¿Lo agregamos?`, quick_replies: ['Si', 'No'] }; 
    }
    
    if (fragancia) {
        this.contexto.estado = ESTADOS.ESPERANDO_PRODUCTO;
        this.contexto.fragancia_seleccionada = fragancia.id;
        this.contexto.intentos_fallidos = 0;
        return { 
            respuesta: `¡Perfecto! Tenemos la fragancia **${fragancia.nombre}**. ¿En qué producto la querés?`,
            quick_replies: ['Difusor', 'Home Spray', 'Perfuminas']
        };
    }
    
    return this._noEntendido();
  }

  _consultaPrecio() { 
    const producto = this.buscadorProd.buscar(this.mensaje); 
    if (producto) return { respuesta: `💰 **${producto.nombre}**\n\n$${producto.precio.toLocaleString()}\n📝 ${producto.descripcion}`, quick_replies: ['Agregar', 'Ver productos'] }; 
    return { respuesta: '¿De qué producto querés el precio?', quick_replies: ['Ver productos'] }; 
  }
  _eliminarItem() { 
    if (this.contexto.carrito.vacio) return { respuesta: '🛒 Carrito vacío.', quick_replies: ['Ver productos'] }; 
    const numeroMatch = this.mensaje.match(/\d+/); 
    if (numeroMatch) { 
      const indice = parseInt(numeroMatch[0]) - 1; 
      if (indice >= 0 && indice < this.contexto.carrito.items.length) { 
        this.contexto.carrito.eliminar(indice); 
        return { respuesta: `✅ Eliminado.\n\n${this.contexto.carrito.obtenerResumen()}`, quick_replies: this.contexto.carrito.vacio ? ['Ver productos'] : ['Eliminar otro', 'Finalizar pedido', 'Seguir comprando'] }; 
      } else {
        return { respuesta: '❌ Número inválido. Elegí un producto de la lista.', quick_replies: Array.from({length: this.contexto.carrito.items.length}, (_, i) => `Eliminar ${i + 1}`) };
      }
    } 
    const botonesEliminar = this.contexto.carrito.items.map((_, i) => `Eliminar ${i + 1}`);
    return { respuesta: `${this.contexto.carrito.obtenerResumen()}\n\n¿Qué producto querés eliminar?`, quick_replies: botonesEliminar.slice(0, 3) }; 
  }
  _vaciarCarrito() { 
    if (this.contexto.carrito.vacio) return { respuesta: '🛒 Ya está vacío.', quick_replies: ['Ver productos'] };
    this.contexto.carrito.vaciar(); 
    this._resetearEstado();
    return { respuesta: '🗑️ Carrito vaciado.', quick_replies: ['Ver productos'] }; 
  }
  
  // ✅ CAMBIO CRÍTICO: Ya no retorna accion_mailto, sino enviar_email: true
  _finalizarPedido() { 
    if (this.contexto.carrito.vacio) return { respuesta: '🛒 Carrito vacío.', quick_replies: ['Ver productos'] }; 
    return { 
      respuesta: `✅ **¡LISTO!**\n\n${this.contexto.carrito.obtenerResumen()}\n\n📧 Clic abajo para enviar.`, 
      enviar_email: true  // ✅ Solo una bandera, no la URL
    }; 
  }

  _noEntendido() {
    const producto = this.buscadorProd.buscar(this.mensaje);
    const fragancia = this.buscadorFrag.buscar(this.mensaje);

    if (producto || fragancia) {
        return this._agregarProducto();
    }
    
    const errorRespuesta = this._incrementarIntentos();
    if (errorRespuesta) return errorRespuesta;
    
    return {
        respuesta: '🤔 No entendí. Podés pedirme:\n\n• "Ver productos"\n• "Ayuda para elegir"\n• O escribir el nombre de lo que buscás.',
        quick_replies: ['Ver productos', 'Ver fragancias', 'Ayudame a elegir']
    };
  }
  
  obtenerRespuesta() {
    try {
      const resultado = this.procesar();
      return { json: { ...resultado, contexto: {
        sessionId: this.contexto.sessionId, 
        carrito: this.contexto.carrito.toJSON(), 
        estado: this.contexto.estado, 
        producto_pendiente: this.contexto.producto_pendiente, 
        producto_seleccionado: this.contexto.producto_seleccionado,
        fragancia_seleccionada: this.contexto.fragancia_seleccionada,
        intentos_fallidos: this.contexto.intentos_fallidos 
      } } };
    } catch (error) {
      return { json: { respuesta: `😕 Error. Email: ${CONFIG.EMAIL}`, quick_replies: ['Reiniciar'], contexto: { carrito: { items: [], total: 0 } }, error: error.message } };
    }
  }
}

// =================================================================
// 🎨 INTERFAZ DE USUARIO DEL CHATBOT (CONTROLADOR DE LA PÁGINA)
// =================================================================
(function() {
  'use strict';
  
  const CONFIG_UI = {
    STORAGE_KEY: 'francesca_chat_context',
    EMAIL_DESTINO: 'esequielbelengimenez@gmail.com'  // ✅ Email hardcodeado en el frontend
  };
  
  const elements = {
    toggle: document.getElementById('chatbot-toggle'),
    window: document.getElementById('chatbot-window'),
    close: document.getElementById('chatbot-close'),
    messages: document.getElementById('chatbot-messages'),
    input: document.getElementById('chatbot-input'),
    send: document.getElementById('chatbot-send'),
    quickReplies: document.getElementById('quick-replies')
  };
  
  let state = {
    contexto: { carrito: { items: [], total: 0 } },
    isOpen: false,
    isProcessing: false
  };
  
  function guardarContexto() {
    try {
      const data = JSON.stringify({ contexto: state.contexto, timestamp: Date.now() });
      sessionStorage.setItem(CONFIG_UI.STORAGE_KEY, data);
    } catch (e) { console.warn('No se pudo guardar el contexto:', e); }
  }
  
  function cargarContexto() {
    return false;
  }
  
  function toggleChat() {
    state.isOpen = !state.isOpen;
    elements.window.style.display = state.isOpen ? 'flex' : 'none';
    elements.toggle.classList.remove('pulse');
    
    if (state.isOpen) {
      elements.input.focus();
      if (elements.messages.children.length === 0) {
        mostrarMensajeBienvenida();
      }
      scrollToBottom();
    }
  }
  
  function scrollToBottom() {
    setTimeout(() => {
      elements.messages.scrollTop = elements.messages.scrollHeight;
    }, 100);
  }
  
  function formatearHora() {
    return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  }

  function agregarMensaje(texto, tipo) {
    if (!texto || texto.trim() === '') return;

    const messageEl = document.createElement('div');
    messageEl.className = tipo === 'user' ? 'user-message' : 'bot-message';

    const textoDiv = document.createElement('div');

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    const regex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = regex.exec(texto)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(texto.substring(lastIndex, match.index)));
      }
      const strong = document.createElement('strong');
      strong.textContent = match[1];
      fragment.appendChild(strong);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < texto.length) {
      fragment.appendChild(document.createTextNode(texto.substring(lastIndex)));
    }

    const nodes = [];
    fragment.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split('\n').forEach((line, i, arr) => {
          nodes.push(document.createTextNode(line));
          if (i < arr.length - 1) nodes.push(document.createElement('br'));
        });
      } else {
        nodes.push(node);
      }
    });

    nodes.forEach(n => textoDiv.appendChild(n));

    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = formatearHora();

    messageEl.appendChild(textoDiv);
    messageEl.appendChild(timeDiv);

    elements.messages.appendChild(messageEl);
    scrollToBottom();
  }
  
  function mostrarIndicadorEscritura() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    elements.messages.appendChild(indicator);
    scrollToBottom();
  }
  
  function ocultarIndicadorEscritura() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }
  
  function mostrarError(mensaje) {
    const errorEl = document.createElement('div');
    errorEl.className = 'bot-message';
    errorEl.style.backgroundColor = '#ffdddd';
    errorEl.style.color = '#d8000c';
    errorEl.textContent = mensaje;
    elements.messages.appendChild(errorEl);
    scrollToBottom();
  }
  
  function mostrarQuickReplies(replies) {
    limpiarQuickReplies();
    if (!replies || replies.length === 0) return;
    
    replies.forEach(reply => {
      const button = document.createElement('button');
      button.className = 'quick-reply-btn';
      button.textContent = reply;
      button.onclick = () => enviarMensaje(reply);
      elements.quickReplies.appendChild(button);
    });
  }
  
  function limpiarQuickReplies() {
    elements.quickReplies.innerHTML = '';
  }
  
  function mostrarMensajeBienvenida() {
    const mensajeBienvenida = '¡Hola! 👋 Soy el asistente de Francesca Olivia.\n\n¿En qué puedo ayudarte hoy?';
    agregarMensaje(mensajeBienvenida, 'bot');
    mostrarQuickReplies(['Ver productos', 'Ver fragancias', 'Ayudame a elegir']);
  }
  
  function bloquearInput(bloquear) {
    state.isProcessing = bloquear;
    elements.input.disabled = bloquear;
    elements.send.disabled = bloquear;
    elements.input.placeholder = bloquear ? 'Esperando respuesta...' : 'Escribe tu mensaje...';
    if (!bloquear) elements.input.focus();
  }
  
  // ✅ NUEVA FUNCIÓN: Construye el mailto de forma segura
  function construirMailtoSeguro(carritoData) {
    const lineas = carritoData.items.map((item, i) => {
      const p = PRODUCTOS[item.productoId];
      const f = item.fraganciaId ? FRAGANCIAS[item.fraganciaId] : null;
      return `${i + 1}. ${item.cantidad}x ${p.nombre}${f ? ` - ${f.nombre}` : ''}\n   $${p.precio.toLocaleString()} c/u = $${(p.precio * item.cantidad).toLocaleString()}`;
    });

    const cuerpo = [
      '¡Hola Francesca Olivia!', '', 
      'Quiero hacer el siguiente pedido:', '', 
      '═══════════════════════════', 
      ...lineas, 
      '═══════════════════════════', 
      `💵 TOTAL: $${carritoData.total.toLocaleString()}`, '', 
      'Por favor, contactame para coordinar forma de pago y envío.', '', 
      '¡Gracias!'
    ].join('\n');

    const asunto = `Pedido Web - ${new Date().toLocaleDateString()}`;
    
    // ✅ Construcción segura: email hardcodeado + datos sanitizados
    return `mailto:${CONFIG_UI.EMAIL_DESTINO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  }
  
  async function procesarLocalmente(mensaje) {
    try {
        const chatbot = new ChatBot(mensaje, state.contexto);
        const response = chatbot.obtenerRespuesta();
        return response.json;
    } catch (error) {
        console.error('Error en la lógica del ChatBot:', error);
        return { 
            respuesta: '😕 Ocurrió un error inesperado. Por favor, intenta de nuevo.',
            contexto: { carrito: { items: [], total: 0 } }
        };
    }
  }

  async function enviarMensaje(mensajeTexto) {
    const mensaje = mensajeTexto.trim();
    if (!mensaje || state.isProcessing) return;
    
    agregarMensaje(mensaje, 'user');
    limpiarQuickReplies();
    elements.input.value = '';
    bloquearInput(true);
    mostrarIndicadorEscritura();
    
    try {
      await new Promise(res => setTimeout(res, 500)); 

      const data = await procesarLocalmente(mensaje);
      ocultarIndicadorEscritura();
      
      if (data && data.respuesta) {
        state.contexto = data.contexto || state.contexto;
        guardarContexto();
        agregarMensaje(data.respuesta, 'bot');
        if (data.quick_replies) mostrarQuickReplies(data.quick_replies);
        
        // ✅ SOLUCIÓN DEFINITIVA AL OPEN REDIRECT
        if (data.enviar_email === true) {
          // Solo construimos el mailto si viene la bandera
          const mailtoURL = construirMailtoSeguro(state.contexto.carrito);
          
          setTimeout(() => {
            window.location.href = mailtoURL;
          }, 500);
        }
        
      } else {
        throw new Error('Respuesta vacía o inválida del chatbot');
      }
    } catch (error) {
      ocultarIndicadorEscritura();
      console.error('Error en enviarMensaje:', error);
      mostrarError('Ocurrió un error. Intenta de nuevo o contactanos por email.');
    } finally {
      bloquearInput(false);
    }
  }
  
  elements.toggle.addEventListener('click', toggleChat);
  elements.close.addEventListener('click', toggleChat);
  elements.send.addEventListener('click', () => enviarMensaje(elements.input.value));
  elements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensaje(elements.input.value);
  });
  
  cargarContexto();
  console.log('✅ Chatbot Francesca Olivia inicializado (Open Redirect RESUELTO).');
})();
