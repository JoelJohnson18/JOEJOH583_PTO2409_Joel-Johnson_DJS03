# DJS03 Project Brief: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading!

The "Book Connect" project provides an opportunity for students to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

#### Goals

- **Refactor Existing Code**: Analyse and refactor the given JavaScript and HTML code to improve its structure using objects and functions.
- **Implement Abstraction**: Use abstraction to hide the complex reality while exposing only the necessary parts. This involves creating more generic functions that can perform tasks in a more flexible way.
- **Documentation**: Write clear comments and documentation for the new code structure to explain the purpose and functionality of code blocks, functions, and objects.
- **Follow Styleguides**: Adhere to established coding conventions and Styleguides to ensure code readability and maintainability.

#### Tasks

1. **Code Analysis**: Start by understanding the current implementation of the "Book Connect" application, including its HTML structure and JavaScript functionality.
2. **Plan Refactoring**: Identify sections of the code that can be made more abstract and modular. Look for patterns and repetitive code that can be simplified.
3. **Implement Abstraction**:
   - **Objects**: Define objects to represent key elements of the application, such as books, authors, and genres. Utilise the provided data (e.g., `authors`, `genres`, `books`) to populate these objects.
   - **Functions**: Create functions that handle repetitive tasks, such as rendering the book list, handling user interactions, and applying filters.
4. **Enhance Functionality**: Ensure that the application remains fully functional after refactoring. Test all features to confirm that users can still search, filter, and view books as intended.
5. **Documentation and Comments**: Throughout the refactoring process, document your code. Provide comments that explain the purpose and functionality of objects and functions.
6. **Adherence to Styleguides**: Ensure your code follows JavaScript and HTML coding standards and best practices for readability and maintainability.

#### Discussion and Reflection

After completing the tasks, prepare a brief presentation for your coaching group on the following:

- The rationale behind the refactoring decisions made, including the choice of objects and functions.
- How abstraction has made the code more maintainable and extendable.
- Any challenges faced during the refactoring process and how they were overcome.
- Reflections on how this exercise has deepened your understanding of JavaScript programming concepts.

#### Submission Guidelines

Submit the refactored version of the "Book Connect" application, including all HTML, CSS, and JavaScript files. Ensure that your code is well-documented and adheres to the specified Styleguides. Include a written report covering the discussion and reflection points outlined above.

Make sure to submit your project to the LMS on the DJS03 Project Tab.

Report:

1. Why I Made These Changes

This was one of the first times I worked with a longer piece of JavaScript code. I noticed that some parts were being repeated, especially when creating preview elements and updating the book list.

To make the code cleaner, I created functions to handle the repeated tasks. For example, I used a createPreview() function to build the book preview buttons. I also separated tasks like setting the theme and rendering the dropdown options to make the main code easier to read and manage.

2. What I Learned About Abstraction

Before this, I wasn’t fully sure what abstraction meant in JavaScript. Through this project, I learned that abstraction is about hiding the complex parts of your code and only showing what’s needed.

By using reusable functions, I made the code more readable and easier to maintain. If I need to make a change, I can now do it in one place instead of updating the same code multiple times.

3. Challenges I Faced

I faced a few challenges:

It was tricky to keep track of the books being shown after searching or clicking "Show More." I eventually understood that I needed to update the matches array and page number properly.

I also had to make sure all the event listeners still worked after making changes. I tested each interaction one by one to make sure everything still connected correctly.
Some of the variable names were confusing at first, so I rewrote parts of the code in a way that made more sense to me as a beginner.

4. What This Taught Me About JavaScript

This task helped me improve my understanding of JavaScript. I learned more about how the browser interacts with JavaScript through query selectors, event listeners, and DOM manipulation.

I now understand how using functions can make code easier to read, test, and update. Most importantly, I realized that good code isn’t just about getting things to work, but about organizing it in a way that makes future changes easier.
