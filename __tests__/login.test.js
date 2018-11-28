describe('login',() => {
    let fetchMock;
    let assignMock;

    beforeEach(() => {
        document.body.innerHTML +=`
        <div id="notify">
          </div>
        <form id="signin">
          <input type="email" id="email" value="test@gmail.com">
          <input type="password"  id="password" value ="test1234">
          <input type="submit" id="submit">
        </form>`;
        fetchMock = jest.spyOn(global,'fetch');
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
    it('fetch data and change the content of #notify', async function() {
        document.getElementById('submit').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/login');
        expect(fetchArgs[1]).toEqual({
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Request-Method': '*'
            },
            mode: "cors",
            body: JSON.stringify({
                email: 'test@gmail.com',
                password: "test1234"
            })

        });
     await Promise.resolve().then();
     await Promise.resolve().then();
     expect(document.getElementById('notify').innerHTML).toBe(
         `<div class="isa_success">
                               <i class="fa fa-check"></i>
     User logged in successfully!
    </div>`);
     expect(localStorage.getItem("token")).not.toBeNull();
     expect(assignMock).toHaveBeenCalledTimes(1);
     expect(assignMock.mock.calls[0][0]).toBe("../HTML/index.html");
    });

    it('Login with wrong password but correct email', async () =>{
        fetchMock = jest.spyOn(global,'fetch');
        fetchMock.mockImplementation(() =>Promise.resolve ({
            json: () => Promise.resolve({Message:"User not found! Check your login details"})
        }));
        document.getElementById('submit').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/login');
        await Promise.resolve().then();
        await Promise.resolve().then();
        expect(document.getElementById('notify').innerHTML).toBe(`<div class="isa_info">
                        <i class="fa fa-info-circle"></i>
                        User not found! Check your login details
                         </div>`);
    });

    it('Login with inexistent email', async () =>{
        fetchMock = jest.spyOn(global,'fetch');
        fetchMock.mockImplementation(() =>Promise.resolve ({
            json: () => Promise.resolve({Message:" User not found!"})
        }));
        document.getElementById('submit').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/login');
        await Promise.resolve().then();
        await Promise.resolve().then();
        expect(document.getElementById('notify').innerHTML).toBe(`<div class="isa_info">
                        <i class="fa fa-info-circle"></i>
                         User not found!
                         </div>`);
    });

    it('Login with email and password fields empty', async () =>{
        fetchMock = jest.spyOn(global,'fetch');
        fetchMock.mockImplementation(() =>Promise.resolve ({
            json: () => Promise.resolve({Message:"Email is required!"})
        }));
        document.getElementById('submit').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/login');
        await Promise.resolve().then();
        await Promise.resolve().then();
        expect(document.getElementById("notify").innerHTML).toBe(`<div class="isa_info">
                        <i class="fa fa-info-circle"></i>
                        Email is required!
                         </div>`);
    });

    it('Login with password field empty', async () =>{
        fetchMock = jest.spyOn(global,'fetch');
        fetchMock.mockImplementation(() =>Promise.resolve ({
            json: () => Promise.resolve({Message:"password is required"})
        }));
        document.getElementById('submit').click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe('https://store-manager-api-app-v2.herokuapp.com/api/v2/auth/login');
        await Promise.resolve().then();
        await Promise.resolve().then();
        expect(document.getElementById("notify").innerHTML).toBe(`<div class="isa_info">
                        <i class="fa fa-info-circle"></i>
                        password is required
                         </div>`);
    });
});