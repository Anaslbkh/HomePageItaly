FROM launcher.gcr.io/google/nodejs

# Install nginx and supervisor
RUN apt-get update -y && \
    apt-get install --no-install-recommends -y -q \
    nginx supervisor

# Install node.js 14.15.5 LTS
RUN install_node v14.15.5

# Copy application code.
COPY . /app/

# Copy config files
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY nginx.conf /etc/nginx/sites-enabled/001-nuxt.conf

# Create required folders
RUN mkdir -p /var/log/supervisor /data/nginx/cache

# Install dependencies.
RUN npm --unsafe-perm install

CMD ["/usr/bin/supervisord"]
