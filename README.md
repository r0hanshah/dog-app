# Dog Breed Gallery

## Introduction

The **Dog Breed Gallery** is a React application that allows users to explore and view images of various dog breeds. Users can select their favorite breeds from a multi-select dropdown menu, and the application will display images of those breeds. This interactive gallery enhances user experience with features like pagination, breed selection, and a fun quiz to help users discover new breeds.

![Dog Breed Gallery Screenshot](/public/images/screenshot.png) 

## Features

- **Multi-Select Dropdown for Breeds**: Users can select multiple dog breeds from a searchable dropdown menu to customize the gallery.
- **Pagination**: Images are displayed with pagination controls, allowing users to navigate through pages of images.
- **Hover to View Breed Name**: Hovering over an image displays the breed name, helping users identify each breed.
- **Responsive Design**: The application is responsive and works well on various screen sizes and devices.
- **Quiz Feature**: When no breeds are selected, a fun quiz helps users determine which dog breed they are most like.
- **No Images Placeholder**: Displays a friendly image and message when no breeds are selected or no images are available.
- **Loading Indicators**: Shows loading animations while fetching data from the API to improve user experience.
- **Optimized Performance**: Efficient data fetching and state management for a smooth user experience.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Hooks**: For state management and lifecycle methods in functional components.
- **React-Select**: A flexible and beautiful Select Input control for React with multiselect and autocomplete support.
- **Axios**: For making HTTP requests to the Dog API.
- **Dog API**: Provides endpoints to fetch breed lists and images.
- **PropTypes**: For type checking of React props.
- **CSS Modules**: For scoped and maintainable styling.

## Getting Started

### Prerequisites

- **Node.js** (version 12 or higher recommended)
- **npm** (comes with Node.js) or **yarn**

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/dog-breed-gallery.git
   cd dog-breed-gallery
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Application**

   ```bash
   npm start
   # or
   yarn start
   ```

   The application will open in your default browser at `http://localhost:3000`.

## Usage

1. **Select Breeds**

   - Use the multi-select dropdown at the top to choose one or more dog breeds.
   - The breeds are sorted alphabetically for easy navigation.
   - You can search for breeds using the search bar within the dropdown.

2. **View Images**

   - Images of the selected breeds will display in the gallery.
   - Hover over an image to see the breed name.

3. **Navigate Pages**

   - Use the "Previous" and "Next" buttons below the gallery to navigate through pages of images.
   - The gallery resets to page 1 whenever new breeds are selected.

4. **Quiz Feature**

   - If no breeds are selected, a fun quiz will appear to help you discover which dog breed you are.
   - Answer the questions, and the app will display images of the breed that matches your personality.

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner.
- **`npm run build`**: Builds the app for production.
- **`npm run eject`**: Ejects the app configuration (note: this is irreversible).

## Project Structure

- **`/src`**: Contains the source code.
  - **`components`**: Reusable components.
    - **`BreedSelector.jsx`**: Component for selecting breeds.
    - **`Gallery.jsx`**: Component for displaying images.
    - **`Quiz.jsx`**: Component for the interactive quiz.
  - **`services`**: API calls and data fetching.
    - **`dogApi.js`**: Functions to interact with the Dog API.
  - **`App.js`**: Main application component.
  - **`App.css`**: Global styles.
- **`/public`**: Public assets and the main HTML file.

## Dependencies

- **react**: ^17.0.2
- **react-dom**: ^17.0.2
- **react-scripts**: ^4.0.3
- **react-select**: ^5.2.2
- **axios**: ^0.21.1
- **prop-types**: ^15.7.2

## API Reference

The application uses the [Dog API](https://dog.ceo/dog-api/) to fetch breed information and images.

- **List All Breeds**: `/breeds/list/all`
- **Get Breed Images**: `/breed/{breed}/images`
- **Get Sub-Breed Images**: `/breed/{breed}/{sub-breed}/images`

## Contributing

Contributions are welcome! If you'd like to contribute:

1. **Fork the repository.**

   ```bash
   git clone https://github.com/yourusername/dog-breed-gallery.git
   ```

2. **Create a new branch:**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit your changes:**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a pull request.**

## License

This project is open source and available under the [MIT License](LICENSE).


### Future Improvements

- **Favorites Feature**: Allow users to favorite images and view them in a separate gallery.
- **Infinite Scroll**: Implement infinite scrolling for the image gallery.
- **Improved Quiz Logic**: Enhance the quiz with more questions and better breed matching.
- **Dark Mode**: Add a toggle for dark mode/light mode themes.

### Learn More

To learn more about React and related technologies, check out the following resources:

- [React Documentation](https://reactjs.org/)
- [React-Select Documentation](https://react-select.com/)
- [Axios Documentation](https://axios-http.com/)
- [Dog API Documentation](https://dog.ceo/dog-api/)

## Screenshots

<!-- Include screenshots if possible -->
![Breed Selector and Gallery](./screenshots/gallery.png)
*Breed Selector and Gallery View*

![Quiz Feature](./screenshots/quiz.png)
*Interactive Quiz when no breeds are selected*



## How to Deploy

To deploy the application for production:

1. **Build the Application**

   ```bash
   npm run build
   ```

2. **Serve the Build Folder**

   You can use a static server like `serve`:

   ```bash
   npm install -g serve
   serve -s build
   ```

   Alternatively, you can deploy the `build` folder to any static hosting service like GitHub Pages, Netlify, or Vercel.

---

## Tips for Reviewers

- **Code Quality**: The project follows best practices in React development, with modular components and clear separation of concerns.
- **User Experience**: Emphasis on a clean and intuitive interface with responsive design.
- **Extensibility**: The codebase is structured to allow easy addition of new features.

---

## Feedback

If you have any suggestions or encounter any issues, please feel free to open an issue on the GitHub repository or contact me directly.

---