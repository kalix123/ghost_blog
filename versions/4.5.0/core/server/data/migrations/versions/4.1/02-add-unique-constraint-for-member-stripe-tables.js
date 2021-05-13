const logging = require('../../../../../shared/logging');
const {createTransactionalMigration} = require('../../utils');
const {addUnique} = require('../../../schema/commands');

module.exports = createTransactionalMigration(
    async function up(connection) {
        if (connection.client.config.client !== 'sqlite3') {
            return logging.warn('Skipping adding unique constraint for members_stripe_customers_subscriptions and members_stripe_customers - database is not SQLite3');
        }

        logging.info('Adding unique constraints for members_stripe_customers_subscriptions and members_stripe_customers');

        await addUnique('members_stripe_customers_subscriptions', ['subscription_id'], connection);
        await addUnique('members_stripe_customers', ['customer_id'], connection);
    },

    async function down() {
        // noop
    }
);
