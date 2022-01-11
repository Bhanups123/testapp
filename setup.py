
from setuptools import find_packages, setup

setup(
    packages=find_packages(),
    package_dir={"": "src"},
    include_package_data=True,
)