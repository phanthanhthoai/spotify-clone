import os

APPS_DIR = './apps'

def delete_migrations(apps_dir):
    for root, dirs, files in os.walk(apps_dir):
        if os.path.basename(root) == 'migrations':
            for file in files:
                if file != '__init__.py' and file.endswith('.py'):
                    file_path = os.path.join(root, file)
                    os.remove(file_path)
                    print(f'🗑️ Deleted: {file_path}')
            for file in files:
                if file.endswith('.pyc'):
                    pyc_path = os.path.join(root, file)
                    os.remove(pyc_path)
                    print(f'🧹 Deleted: {pyc_path}')

if __name__ == '__main__':
    delete_migrations(APPS_DIR)