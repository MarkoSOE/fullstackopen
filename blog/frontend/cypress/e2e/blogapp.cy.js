describe("Note app", function () {
	Cypress.Commands.add("login", ({ username, password }) => {
		cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
			username,
			password,
		}).then(({ body }) => {
			if (body) {
				localStorage.setItem("user", JSON.stringify(body));
				cy.visit("");
			}
			cy.visit("");
		});
	});
	Cypress.Commands.add("createBlog", ({ title, author, url }) => {
		cy.request({
			url: `${Cypress.env("BACKEND")}/blogs`,
			method: "POST",
			body: { title, author, url },
			headers: {
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("user")).token
				}`,
			},
		});
		cy.visit("");
	});
	Cypress.Commands.add(
		"isVisible",
		{
			prevSubject: true,
		},
		(subject) => {
			const isVisible = (elem) =>
				!!(
					elem.offsetWidth ||
					elem.offsetHeight ||
					elem.getClientRects().length
				);
			expect(isVisible(subject[0])).to.be.true;
		}
	);
	beforeEach(function () {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
		const user = {
			name: "Matti Luukkainen",
			username: "mluukkai",
			password: "salainen",
		};
		const otherUser = {
			name: "Marko A",
			username: "markoa",
			password: "markoa",
		};
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, otherUser);
		cy.visit("");
	});
	it("front page can be opened", function () {
		cy.contains("Log in to application");
	});
	describe("Login", function () {
		it("Succeeds with the right credentials", function () {
			cy.login({ username: "mluukkai", password: "salainen" });
			cy.contains("Matti Luukkainen logged in");
		});
		it("Fails with the wrong credentials", function () {
			cy.login({ username: "test", password: "test" });
			cy.wait(500);
			cy.contains("test logged in").should("not.exist");
			// cy.get(".error")
			// 	.should("contain", "wrong credentials")
			// 	.and("have.css", "color", "rgb(255, 0, 0)")
			// 	.and("have.css", "border-style", "solid");
		});
	});
	describe("when logged in", function () {
		beforeEach(function () {
			const user = {
				username: "mluukkai",
				password: "salainen",
			};
			cy.login({ username: user.username, password: user.password });
		});
		it("a blog can be created", function () {
			cy.contains("new blog").click();
			cy.get("#title").type("cypress");
			cy.get("#author").type("Matti Luukkainen");
			cy.get("#url").type("cypress");
			cy.get("#blogsubmit").click();

			cy.get("#blogTitle").contains("cypress");
			cy.get("#blogAuthor").contains("mluukkai");
		});
		it("users can like a blog", function () {
			cy.createBlog({
				title: "cypress",
				author: "Matti Luukkainen",
				url: "cypress",
			});

			cy.get("#viewDetails").click();
			cy.get("#likeButton").click();
			cy.contains("Likes 1");
		});

		it("blog can only be deleted by creator", function () {
			cy.createBlog({
				title: "cypress",
				author: "Matti Luukkainen",
				url: "cypress",
			});

			cy.contains("Log out").click();

			cy.login({ username: "markoa", password: "markoa" });

			cy.get("#viewDetails").click();
			cy.get("#removeButton").click();
			cy.on("window:confirm", () => true);
			cy.contains(
				"invalid attempt; logged in user does not have authorization"
			);
		});

		it("blogs are ordered according to likes", function () {
			cy.createBlog({
				title: "Title with the least likes",
				author: "Matti Luukkainen",
				url: "cypress",
			});
			cy.createBlog({
				title: "Title with the second most likes",
				author: "Matti Luukkainen",
				url: "cypress",
			});
			cy.createBlog({
				title: "Title with the most likes",
				author: "Matti Luukkainen",
				url: "cypress",
			});

			cy.contains("Title with the most likes")
				.parent()
				.find("button")
				.as("viewButton");
			cy.get("@viewButton").click();

			cy.get(".blogPost")
				.eq(2)
				.find("button")
				.contains("Like")
				.click()
				.wait(500)
				.click();
			cy.get(".blogPost").eq(2).find("button").contains("view").click();

			cy.contains("Title with the second most likes")
				.parent()
				.find("button")
				.as("viewButton");
			cy.get("@viewButton").click();

			cy.get(".blogPost").eq(1).find("button").contains("Like").click();
			cy.get(".blogPost").eq(1).find("button").contains("view").click();

			cy.reload();

			cy.get(".blogPost").eq(0).should("contain", "Title with the most likes");
			cy.get(".blogPost")
				.eq(1)
				.should("contain", "Title with the second most likes");
			cy.get(".blogPost").eq(2).should("contain", "Title with the least likes");
		});
	});
});
