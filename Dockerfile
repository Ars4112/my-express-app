# Явно указываем полную версию образа
FROM node:20.12.2-bullseye

WORKDIR /app

# Сначала копируем только зависимости
COPY package.json ./

# Устанавливаем зависимости (включая dev) и tsx глобально
RUN npm install -g tsx@4.20.3 && \
    npm install --include=dev

# Копируем остальные файлы
COPY . .

# Компилируем проект
RUN npm run build

EXPOSE 3001

# Используем npm run для гарантии правильного окружения
CMD ["npm", "run", "dev"]