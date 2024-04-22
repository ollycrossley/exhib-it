

# Exhib-it!

![Logo](other/EXHIB-IT!.png)

## Project Description

Exhib-It is a Next.js based web project that aims to combine popular museum/art exhibition apis, display them for public view and then allow you to make your own exhibits!

## Live Demo

If you wish to see the website in action, the live demo link is below:

https://exhib-it.vercel.app/

## Running locally

### Clone repo 

Simply click the green "Code" button above and either clone using Git or download as a ZIP!

### Installing Packages 

Please ensure you have the following prerequisites downloaded:
- NPM
- Node.js

Open a command prompt inside the main `exhib-it` folder.

Please run `npm install` to install all available packages.

### Setting up `.env` files 

Create a file named `.env` in the root directory.

This website runs on a single `.env` file in the root directory and should contain the following line:
```dotenv
NEXT_PUBLIC_HARVARD_API_KEY=your-key-here
```

Please contact the [Harvard API Team](https://docs.google.com/forms/d/e/1FAIpQLSfkmEBqH76HLMMiCC-GPPnhcvHC9aJS86E32dOd0Z8MpY2rvQ/viewform) to get your
api key for the harvard functionality to work.

### Run website

To run a local version of the website for development, you can run `npm run dev`. 

Lastly, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
