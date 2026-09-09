/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — PERSISTENT DATABASE & ACTIVITY ENGINE
   ========================================================================== */

const CafeDB = {
  KEYS: {
    RESERVATIONS: 'outnbeyond_db_reservations',
    ORDERS: 'outnbeyond_db_orders',
    INQUIRIES: 'outnbeyond_db_inquiries',
    ACTIVITY_LOGS: 'outnbeyond_db_activity_logs',
    ADMIN_PIN: 'outnbeyond_admin_pin'
  },

  DEFAULT_PIN: '1234',

  init() {
    this.seedInitialData();
  },

  getPin() {
    return localStorage.getItem(this.KEYS.ADMIN_PIN) || this.DEFAULT_PIN;
  },

  setPin(newPin) {
    if (newPin && newPin.length >= 4) {
      localStorage.setItem(this.KEYS.ADMIN_PIN, newPin);
      this.logActivity('Admin PIN was updated');
      return true;
    }
    return false;
  },

  // --------------------------------------------------------------------------
  // RESERVATIONS
  // --------------------------------------------------------------------------
  getReservations() {
    try {
      const data = localStorage.getItem(this.KEYS.RESERVATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading reservations', e);
      return [];
    }
  },

  addReservation(resData) {
    const list = this.getReservations();
    const newRecord = {
      id: resData.bookingId || ('#OB-' + Math.floor(1000 + Math.random() * 9000)),
      guestName: resData.guestName || 'Guest',
      guestPhone: resData.guestPhone || '',
      guestEmail: resData.guestEmail || '',
      dateDetail: resData.dateDetail || 'Today',
      time: resData.time || '6:30 PM',
      partySize: resData.partySize || '2',
      partyPersona: resData.partyPersona || 'Date Vibe',
      seatingZoneName: resData.seatingZoneName || 'Indoor AC Roastery',
      specialNotes: resData.specialNotes || 'Complimentary fresh-baked cookie voucher active',
      status: 'Confirmed', // 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled'
      createdAt: new Date().toISOString(),
      timestampFormatted: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    };

    list.unshift(newRecord);
    localStorage.setItem(this.KEYS.RESERVATIONS, JSON.stringify(list));
    this.logActivity(`Table Reserved by ${newRecord.guestName} (${newRecord.partySize} guests, ${newRecord.seatingZoneName})`);
    return newRecord;
  },

  updateReservationStatus(id, newStatus) {
    const list = this.getReservations();
    const item = list.find(r => r.id === id);
    if (item) {
      item.status = newStatus;
      localStorage.setItem(this.KEYS.RESERVATIONS, JSON.stringify(list));
      this.logActivity(`Reservation ${id} updated to ${newStatus}`);
      return true;
    }
    return false;
  },

  deleteReservation(id) {
    let list = this.getReservations();
    list = list.filter(r => r.id !== id);
    localStorage.setItem(this.KEYS.RESERVATIONS, JSON.stringify(list));
    this.logActivity(`Reservation ${id} deleted`);
    return true;
  },

  // --------------------------------------------------------------------------
  // ORDERS (KITCHEN & ONLINE)
  // --------------------------------------------------------------------------
  getOrders() {
    try {
      const data = localStorage.getItem(this.KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading orders', e);
      return [];
    }
  },

  addOrder(orderData) {
    const list = this.getOrders();
    const newRecord = {
      id: '#ORD-' + Math.floor(1000 + Math.random() * 9000),
      customerName: orderData.customerName || 'Customer',
      customerPhone: orderData.customerPhone || '',
      orderType: orderData.orderType || 'delivery', // 'delivery' | 'takeaway'
      deliveryAddress: orderData.deliveryAddress || 'Pick-up at counter (14/2B Hindustan Park)',
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      gst: orderData.gst || 0,
      packagingFee: orderData.packagingFee || 0,
      deliveryFee: orderData.deliveryFee || 0,
      discount: orderData.discount || 0,
      couponUsed: orderData.couponUsed || 'NONE',
      grandTotal: orderData.grandTotal || 0,
      orderNotes: orderData.orderNotes || '',
      status: 'New', // 'New' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled'
      createdAt: new Date().toISOString(),
      timestampFormatted: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    };

    list.unshift(newRecord);
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(list));
    this.logActivity(`New Order ${newRecord.id} placed by ${newRecord.customerName} (₹${newRecord.grandTotal}, ${newRecord.orderType.toUpperCase()})`);
    return newRecord;
  },

  updateOrderStatus(id, newStatus) {
    const list = this.getOrders();
    const item = list.find(o => o.id === id);
    if (item) {
      item.status = newStatus;
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(list));
      this.logActivity(`Order ${id} status updated to ${newStatus}`);
      return true;
    }
    return false;
  },

  deleteOrder(id) {
    let list = this.getOrders();
    list = list.filter(o => o.id !== id);
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(list));
    this.logActivity(`Order ${id} removed`);
    return true;
  },

  // --------------------------------------------------------------------------
  // INQUIRIES (CONTACT MESSAGES)
  // --------------------------------------------------------------------------
  getInquiries() {
    try {
      const data = localStorage.getItem(this.KEYS.INQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading inquiries', e);
      return [];
    }
  },

  addInquiry(inquiryData) {
    const list = this.getInquiries();
    const newRecord = {
      id: '#INQ-' + Math.floor(1000 + Math.random() * 9000),
      name: inquiryData.name || 'Anonymous',
      email: inquiryData.email || '',
      message: inquiryData.message || '',
      status: 'Unread', // 'Unread' | 'Replied'
      createdAt: new Date().toISOString(),
      timestampFormatted: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    };

    list.unshift(newRecord);
    localStorage.setItem(this.KEYS.INQUIRIES, JSON.stringify(list));
    this.logActivity(`New Contact Inquiry received from ${newRecord.name} (${newRecord.email})`);
    return newRecord;
  },

  updateInquiryStatus(id, newStatus) {
    const list = this.getInquiries();
    const item = list.find(i => i.id === id);
    if (item) {
      item.status = newStatus;
      localStorage.setItem(this.KEYS.INQUIRIES, JSON.stringify(list));
      this.logActivity(`Inquiry ${id} marked as ${newStatus}`);
      return true;
    }
    return false;
  },

  // --------------------------------------------------------------------------
  // USER AUDIT ACTIVITY LOG
  // --------------------------------------------------------------------------
  getActivityLogs() {
    try {
      const data = localStorage.getItem(this.KEYS.ACTIVITY_LOGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading activity logs', e);
      return [];
    }
  },

  logActivity(actionDescription) {
    const logs = this.getActivityLogs();
    const logItem = {
      id: 'log-' + Date.now(),
      action: actionDescription,
      timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric' })
    };

    logs.unshift(logItem);
    // Keep last 100 entries
    if (logs.length > 100) logs.pop();
    localStorage.setItem(this.KEYS.ACTIVITY_LOGS, JSON.stringify(logs));
  },

  // --------------------------------------------------------------------------
  // INITIAL SEEDING (POPULATE ON FIRST VISIT)
  // --------------------------------------------------------------------------
  seedInitialData() {
    if (!localStorage.getItem(this.KEYS.RESERVATIONS)) {
      const initialReservations = [
        {
          id: "#OB-9482",
          guestName: "Ananya Sen",
          guestPhone: "98301 22445",
          guestEmail: "ananya.sen@gmail.com",
          dateDetail: "Today",
          time: "7:00 PM",
          partySize: "2",
          partyPersona: "Date Vibe",
          seatingZoneName: "Golden Hour Bay Window (Zone B)",
          specialNotes: "Celebrating 1st anniversary. Window corner preferred.",
          status: "Confirmed",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          timestampFormatted: "Today • 6:15 PM"
        },
        {
          id: "#OB-8120",
          guestName: "Rohan Dasgupta",
          guestPhone: "98310 99882",
          guestEmail: "rohan.tech@gmail.com",
          dateDetail: "Today",
          time: "8:30 PM",
          partySize: "4",
          partyPersona: "Squad Hangout",
          seatingZoneName: "Pet-Friendly Garden Veranda (Zone D)",
          specialNotes: "Bringing a golden retriever puppy 🐶",
          status: "Seated",
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          timestampFormatted: "Today • 5:20 PM"
        },
        {
          id: "#OB-7651",
          guestName: "Priyanka Chakraborty",
          guestPhone: "97482 11003",
          guestEmail: "priya.c@outlook.com",
          dateDetail: "Tomorrow",
          time: "11:30 AM",
          partySize: "1",
          partyPersona: "Solo Focus Work",
          seatingZoneName: "Indoor AC Roastery (Zone A)",
          specialNotes: "Laptop plug point requested",
          status: "Confirmed",
          createdAt: new Date(Date.now() - 14400000).toISOString(),
          timestampFormatted: "Today • 2:45 PM"
        }
      ];
      localStorage.setItem(this.KEYS.RESERVATIONS, JSON.stringify(initialReservations));
    }

    if (!localStorage.getItem(this.KEYS.ORDERS)) {
      const initialOrders = [
        {
          id: "#ORD-4029",
          customerName: "Sayan Bhattacharya",
          customerPhone: "98365 44120",
          orderType: "delivery",
          deliveryAddress: "Flat 3A, Lake Terrace Road, Kolkata 700029",
          items: [
            { name: "Avocado & Slow-Poached Egg Toast", price: 340, quantity: 1 },
            { name: "Signature 18-hr Cold Brew Float", price: 260, quantity: 2 },
            { name: "Lotus Biscoff Tiramisu Cloud", price: 290, quantity: 1 }
          ],
          subtotal: 1150,
          gst: 58,
          packagingFee: 20,
          deliveryFee: 40,
          discount: 115,
          couponUsed: "BEYOND10",
          grandTotal: 1153,
          orderNotes: "Extra caramel drizzle on tiramisu please",
          status: "Preparing",
          createdAt: new Date(Date.now() - 1200000).toISOString(),
          timestampFormatted: "20 min ago"
        },
        {
          id: "#ORD-3914",
          customerName: "Megha Banerjee",
          customerPhone: "90070 33219",
          orderType: "takeaway",
          deliveryAddress: "Pick-up at Bistro Counter (14/2B Hindustan Park)",
          items: [
            { name: "Korean Gochujang Crisp Chicken", price: 390, quantity: 1 },
            { name: "Single-Estate Iced Cortado", price: 220, quantity: 1 }
          ],
          subtotal: 610,
          gst: 31,
          packagingFee: 0,
          deliveryFee: 0,
          discount: 0,
          couponUsed: "NONE",
          grandTotal: 641,
          orderNotes: "Packing for quick pickup on the way to office",
          status: "Completed",
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          timestampFormatted: "2 hours ago"
        }
      ];
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(initialOrders));
    }

    if (!localStorage.getItem(this.KEYS.INQUIRIES)) {
      const initialInquiries = [
        {
          id: "#INQ-104",
          name: "Dr. Arindam Bose",
          email: "arindam.bose@caluniv.ac.in",
          message: "Interested in booking the entire outdoor garden veranda for a 20-person book launch event next Friday evening.",
          status: "Unread",
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          timestampFormatted: "3 hours ago"
        },
        {
          id: "#INQ-103",
          name: "Sunrita Roy",
          email: "sunrita.art@gmail.com",
          message: "Do you allow indie acoustic music gigs or art exhibitions on weekday evenings?",
          status: "Replied",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          timestampFormatted: "Yesterday"
        }
      ];
      localStorage.setItem(this.KEYS.INQUIRIES, JSON.stringify(initialInquiries));
    }

    if (!localStorage.getItem(this.KEYS.ACTIVITY_LOGS)) {
      const initialLogs = [
        { id: 'log-1', action: 'System Database initialized with initial records', timestamp: '11:00 AM', date: 'Sep 10' },
        { id: 'log-2', action: 'Customer Ananya Sen booked Table #OB-9482', timestamp: '06:15 PM', date: 'Today' },
        { id: 'log-3', action: 'Customer Sayan placed delivery Order #ORD-4029 (₹1153)', timestamp: '06:40 PM', date: 'Today' },
        { id: 'log-4', action: 'Customer viewed Sourdough & Bowls Menu Category', timestamp: '06:42 PM', date: 'Today' }
      ];
      localStorage.setItem(this.KEYS.ACTIVITY_LOGS, JSON.stringify(initialLogs));
    }
  },

  // --------------------------------------------------------------------------
  // CSV EXPORT FOR SPREADSHEETS (EXCEL / GOOGLE SHEETS)
  // --------------------------------------------------------------------------
  exportCSV(type) {
    let rows = [];
    let filename = `out_n_beyond_${type}_${new Date().toISOString().slice(0,10)}.csv`;

    if (type === 'reservations') {
      const list = this.getReservations();
      rows.push(["Booking ID", "Guest Name", "Phone", "Email", "Date", "Time", "Party Size", "Zone", "Status", "Notes"]);
      list.forEach(r => {
        rows.push([r.id, `"${r.guestName}"`, `"${r.guestPhone}"`, `"${r.guestEmail}"`, `"${r.dateDetail}"`, `"${r.time}"`, r.partySize, `"${r.seatingZoneName}"`, r.status, `"${r.specialNotes || ''}"`]);
      });
    } else if (type === 'orders') {
      const list = this.getOrders();
      rows.push(["Order ID", "Customer Name", "Phone", "Type", "Grand Total (INR)", "Status", "Items Ordered", "Address"]);
      list.forEach(o => {
        const itemSummary = o.items.map(i => `${i.name} (${i.quantity})`).join("; ");
        rows.push([o.id, `"${o.customerName}"`, `"${o.customerPhone}"`, o.orderType, o.grandTotal, o.status, `"${itemSummary}"`, `"${o.deliveryAddress}"`]);
      });
    } else if (type === 'inquiries') {
      const list = this.getInquiries();
      rows.push(["Inquiry ID", "Name", "Email", "Status", "Message", "Received Time"]);
      list.forEach(i => {
        rows.push([i.id, `"${i.name}"`, `"${i.email}"`, i.status, `"${i.message}"`, `"${i.timestampFormatted}"`]);
      });
    }

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.logActivity(`Exported ${type} to CSV file (${filename})`);
  }
};

// Initialize on script load
CafeDB.init();

if (typeof window !== 'undefined') {
  window.CafeDB = CafeDB;
}
