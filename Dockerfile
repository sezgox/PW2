FROM node
WORKDIR /app/notesApp
COPY ./app /app/notesApp
RUN mkdir /app/notesApp
RUN npm install
EXPOSE 3000
CMD node src/index.js