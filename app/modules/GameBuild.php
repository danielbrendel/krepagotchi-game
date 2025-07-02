<?php

/**
 * Class GameBuild
 */
class GameBuild {
    /**
     * @param $bundle
     * @param $debug
     * @return void
     */
    public static function make($bundle = 'html5', $debug = false)
    {
        $build_type = ($debug) ? 'Debug' : 'Release';
        echo "Building game (Platform: {$bundle}, Build type: {$build_type})...\n";

        $_SERVER['SERVER_PORT'] = 80;
        $_SERVER['SERVER_NAME'] = 'localhost';
        $_ENV['APP_DEBUG'] = $debug;

        echo "Creating folders...\n";
        
        if (!is_dir(public_path() . '/build')) {
            mkdir(public_path() . '/build');
        }

        if (!is_dir(public_path() . '/build/js')) {
            mkdir(public_path() . '/build/js');
        }

        if (!is_dir(public_path() . '/build/img')) {
            mkdir(public_path() . '/build/img');
        }

        if (!is_dir(public_path() . '/build/game')) {
            mkdir(public_path() . '/build/game');
        }

        echo "Generating view...\n";

        $view = view('layout', ['content', 'index'], [])->out(true);
        $view = str_replace('http://' . $_SERVER['SERVER_NAME'] . '/', '', $view);
        file_put_contents(public_path() . '/build/index.html', $view);

        echo "Copying assets...\n";

        copy(public_path() . '/js/app.js', public_path() . '/build/js/app.js');
        copy(public_path() . '/manifest.json', public_path() . '/build/manifest.json');
        copy(public_path() . '/serviceworker.js', public_path() . '/build/serviceworker.js');
        copy(public_path() . '/img/logo.png', public_path() . '/build/img/logo.png');
        copy(public_path() . '/img/background.png', public_path() . '/build/img/background.png');
        copy(public_path() . '/img/logo.png', public_path() . '/build/game/logo.png');
        copy(public_path() . '/img/screenshot-game.png', public_path() . '/build/img/screenshot-game.png');
        copy(public_path() . '/game/game.js', public_path() . '/build/game/game.js');

        system('xcopy "' . public_path() . '/game/assets" "' . public_path() . '/build/game/assets/" /E /V /I /Y');

        if ($debug) {
            echo "Adding build info...\n";

            $build_info = [
                'type' => $build_type,
                'time' => date('Y-m-d H:i:s'),
                'platform' => PHP_OS,
                'php' => PHP_VERSION
            ];

            file_put_contents(public_path() . '/build/version.json', json_encode($build_info));
        }

        $root_path = public_path() . '/build';

        $method_name = 'bundle' . ucfirst($bundle);
        if (method_exists(static::class, $method_name)) {
            echo "Bundling...\n";

            try {
                static::$method_name($root_path);
            } catch (\Exception $e) {
                echo "[ERROR] Failed to bundle game package\n";
            }
        }

        echo "Cleaning up...\n";

        system('rmdir /S /Q "' . $root_path . '"');

        echo "Done!\n";
    }

    /**
     * @param $src
     * @return void
     * @throws \Exception
     */
    public static function bundleHtml5($src)
    {
        try {
            $package_name = 'game_build_' . time() . '.zip';
    
            $zip = new ZipArchive();
            $zip->open(public_path() . '/builds/' . $package_name, ZIPARCHIVE::CREATE | ZipArchive::OVERWRITE);
    
            $files = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($src),
                RecursiveIteratorIterator::LEAVES_ONLY
            );
    
            foreach ($files as $file) {
                if (!$file->isDir()) {
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($src) + 1);
    
                    $zip->addFile($filePath, $relativePath);
                }
            }
    
            $zip->close();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * @param $src
     * @return void
     * @throws \Exception
     */
    public static function bundleWindows($src)
    {
        try {
            system('xcopy "' . $src . '" "' . public_path() . '/bundler/game/" /E /V /I /Y');
            copy(public_path() . '/img/logo.png', public_path() . '/bundler/game/logo.png');

            $build_config = [
                'name' => env('APP_NAME'),
                'icon' => 'game/logo.png',
                'width' => env('APP_GAMERESX'),
                'height' => env('APP_GAMERESY')
            ];

            file_put_contents(public_path() . '/bundler/build.json', json_encode($build_config));

            system('cd /d "' . public_path() . '/bundler" && npm run build-windows');

            copy(public_path() . '/bundler/dist/Krepagotchi 1.0.0.exe', public_path() . '/builds/game_build_' . time() . '.exe');

            system('rmdir /S /Q "' . public_path() . '/bundler/game"');
            system('rmdir /S /Q "' . public_path() . '/bundler/dist"');
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * @param $src
     * @return void
     * @throws \Exception
     */
    public static function bundleLinux($src)
    {
        try {
            system('xcopy "' . $src . '" "' . public_path() . '/bundler/game/" /E /V /I /Y');
            copy(public_path() . '/img/logo.png', public_path() . '/bundler/game/logo.png');

            $build_config = [
                'name' => env('APP_NAME'),
                'icon' => 'game/logo.png',
                'width' => env('APP_GAMERESX'),
                'height' => env('APP_GAMERESY')
            ];

            file_put_contents(public_path() . '/bundler/build.json', json_encode($build_config));

            system('cd /d "' . public_path() . '/bundler" && npm run build-linux');

            copy(public_path() . '/bundler/dist/Krepagotchi-1.0.0-arm64.AppImage', public_path() . '/builds/game_build_' . time() . '.AppImage');

            system('rmdir /S /Q "' . public_path() . '/bundler/game"');
            system('rmdir /S /Q "' . public_path() . '/bundler/dist"');
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * @param $src
     * @return void
     * @throws \Exception
     */
    public static function bundleMacos($src)
    {
        try {
            system('xcopy "' . $src . '" "' . public_path() . '/bundler/game/" /E /V /I /Y');
            copy(public_path() . '/img/logo.png', public_path() . '/bundler/game/logo.png');

            $build_config = [
                'name' => env('APP_NAME'),
                'icon' => 'game/logo.png',
                'width' => env('APP_GAMERESX'),
                'height' => env('APP_GAMERESY')
            ];

            file_put_contents(public_path() . '/bundler/build.json', json_encode($build_config));

            system('cd /d "' . public_path() . '/bundler" && npm run build-macos');

            copy(public_path() . '/bundler/dist/Krepagotchi-1.0.0.app', public_path() . '/builds/game_build_' . time() . '.app');

            system('rmdir /S /Q "' . public_path() . '/bundler/game"');
            system('rmdir /S /Q "' . public_path() . '/bundler/dist"');
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
