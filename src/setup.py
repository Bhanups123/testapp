
from setuptools import find_packages, setup

setup(
    packages=find_packages(where='tempo/*'),
    package_dir={'': 'tempo/'}
)