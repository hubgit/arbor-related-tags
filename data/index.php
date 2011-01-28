<?php

if (!$_GET['tag']) exit('Tag parameter required');

header('Content-Type: application/json;charset=UTF-8');
print file_get_contents('http://datamining4.mendeley.internal:8888/similartags_mr/?tag=' . urlencode($_GET['tag']));