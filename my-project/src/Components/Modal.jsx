const Modal = ({ item, onClose, onConfirm }) => {
  if (!item) return null; // Safeguard against undefined item
  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.modal}>
        <h2 style={{ fontFamily: "Gabarito" }}>Add to Cart</h2>
        <p style={{ margin: "20px 0", fontSize: "18px" }}>
          Add <strong>{item.name}</strong> to your cart?
        </p>
        <p style={{ fontWeight: "bold", margin: "10px 0" }}>
          Price: ₹{item.price / 100 || item.defaultPrice / 100}
        </p>
        {item.description && (
          <p style={{ fontStyle: "italic", color: "gray" }}>
            {item.description}
          </p>
        )}
        {item.imageId && (
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}.png`}
            alt={item.name}
            style={{ width: "150px", height: "150px", borderRadius: "10px" }}
          />
        )}
        <div>
          <button
            style={{
              ...styles.modalButton,
              backgroundColor: "green",
              color: "white",
            }}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            style={{ ...styles.modalButton, backgroundColor: "#ddd" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
