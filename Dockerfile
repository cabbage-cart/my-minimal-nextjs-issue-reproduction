FROM node:18.17.1

#### app directory setup ####
# - Set location of app
# - Create app location
# - Set working directory to app location
ENV APP_HOME=/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

# Copy source code to image
COPY . $APP_HOME/
