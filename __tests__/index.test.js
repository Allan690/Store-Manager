describe("View all products", () => {
    let fetchMock;

    beforeEach(() => {
        document.body.innerHTML += `
      <div id ='notify'></div>
      <div id="product"></div>
    `;
        fetchMock = jest.spyOn(global, 'fetch');
        fetchMock.mockImplementation(() => Promise.resolve({
            json: () => ({Message:"Products not found!"})
        }));
        require('../UI/js/allProducts');
    });

    afterEach(() => {
        fetchMock.mockRestore();
        jest.resetModules();
    });
    it('should fetch all products, change content of #notify', async () => {
        const token = localStorage.getItem("token");
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://store-manager-api-app-v2.herokuapp.com/api/v2/products');
        expect(fetchArgs[1]).toEqual({
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Request-Method': '*',
                'Authorization': `Bearer ${token}`
            },
            method: "GET",
            mode: "cors",
        });
        // pause synchronous execution of the test for two event loop cycles
        // so the callbacks queued by the then()'s within signUp have a chance to run
        await Promise.resolve().then();
        await Promise.resolve().then();
        expect(document.getElementById('notify').innerHTML).toBe(`<div class="isa_info">
    <i class="fa fa-info-circle"></i>
    Be calm. You got not products. But when you create 'em, they'll appear here :-)
</div>`);
    });
});