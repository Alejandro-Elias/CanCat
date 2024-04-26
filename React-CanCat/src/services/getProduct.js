const getProduct = async (id) => {

    try {
        const response = await fetch(`http://localhost:3000/apis/products/${id}`);
        const result = await response.json();

        if (result.ok) {
            return result.Producto            
        }
        
    } catch (error) {
        console.error;        
    }
}

export {
    getProduct
}