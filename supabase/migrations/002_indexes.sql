-- Performance indexes for high-frequency query columns

-- Dashboard: leads by agent (ORDER BY created_at DESC)
create index if not exists idx_leads_agent_id_created
  on leads(agent_id, created_at desc);

-- Reminder cron: leads by created_at + reminder_sent + status
create index if not exists idx_leads_reminder_cron
  on leads(created_at, reminder_sent, status)
  where reminder_sent = false;

-- Subscription lookup by user_id (used on every dashboard load)
create index if not exists idx_subscriptions_user_id
  on subscriptions(user_id);

-- Webhook token lookup by token value
create index if not exists idx_webhook_tokens_token
  on webhook_tokens(token);
