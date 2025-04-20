import os

BASE_DIR = '.'

def create_init_files(base_path):
    for root, dirs, files in os.walk(base_path):
        if os.path.basename(root) == 'migrations':
            init_file = os.path.join(root, '__init__.py')
            if not os.path.exists(init_file):
                with open(init_file, 'w') as f:
                    f.write('# Automatically created by script.\n')
                print(f'✅ Created: {init_file}')
            else:
                print(f'✔️ Already exists: {init_file}')

if __name__ == '__main__':
    create_init_files(BASE_DIR)
