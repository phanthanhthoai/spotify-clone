# Generated by Django 5.1.7 on 2025-05-07 20:25

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('albums', '0001_initial'),
        ('songs', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='albumsong',
            name='album',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='songs', to='albums.album'),
        ),
        migrations.AddField(
            model_name='albumsong',
            name='song',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='albums', to='songs.song'),
        ),
        migrations.AlterUniqueTogether(
            name='albumsong',
            unique_together={('album', 'song')},
        ),
    ]
