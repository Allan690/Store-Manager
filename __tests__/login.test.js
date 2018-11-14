describe('login',() => {
    let fetchMock;
    let assignMock;

    beforeEach(() => {
        document.body.innerHTML +=`
        <div id="notify"></div>
        <form id="login">
          <input type="email" id="email" value="test@gmail.com">
          <input type="password"  id="password" value ="testing1234">
          <input type="submit" id="submit">
        </form>`;
        fetchMock = jest.spyOn(global, 'fetch');
        fetchMock.mockImplementation(() =>Promise.resolve ({
            json: () => Promise.resolve({Message:"User logged in successfully!"})
        }));
        assignMock = jest.spyOn(window.location , "assign");
        assignMock.mockImplementation(() =>{});
        require('../UI/js/login');
    });
    afterEach(() => {
        fetchMock.mockRestore();
        assignMock.mockRestore();
        jest.resetModules()
    });
    it('fetch data and change the content of #notify', async () =>{
        document.getElementById('submit').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/login');
        expect(fetchArgs[1]).toEqual({
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Request-Method': '*'
            },
            body: JSON.stringify({
                email: 'test@gmail.com',
                password: "testing1234"
            })

        });
        expect.assertions(1);
        await Promise.resolve().then();
        expect(document.getElementById('notify').innerHTML).toBe(
            `<div class="isa_success">
            <i class="fa fa-check"></i>
        User logged in successfully!
        </div>`);
        expect(assignMock).toHaveBeenCalledTimes(1);
        expect(assignMock.mock.calls[0][0]).toBe("./index.html");
    });
    it('Login with wrong email/password', async () =>{
        fetchMock = jest.spyOn(global,'fetch');
        fetchMock.mockImplementation(() =>Promise.resolve ({
            json: () => Promise.resolve({Message:"User not found!"})
        }));
        document.getElementById('submit').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/login');
        await Promise.resolve().then();
        expect(document.getElementById('notify').innerHTML).toBe( '<div class="isa_info">\n  ' +
            ' <i class="fa fa-info-circle"></i>\n ' +
            'User not found!\n' +
            '</div>');
    });

});