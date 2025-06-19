# 📁 Backups Folder

This folder contains backup files exported from the admin panel.

## How to Use

1. **Export from admin**: Go to `/admin` and click "📤 Export"
2. **Save file here**: Put the downloaded JSON file in this folder
3. **Commit to git**: Add, commit, and push to save in repository
4. **Import anywhere**: Use "📥 Import" in admin panel to restore

## File Naming Convention
- `backup-YYYY-MM-DD.json` - Daily backups
- `backup-production-YYYY-MM-DD.json` - Production backups
- `backup-feature-name.json` - Feature-specific backups

## Important Notes
- These files contain base64 encoded images, so they can be large
- Always export before making major changes
- Keep multiple backups for safety
